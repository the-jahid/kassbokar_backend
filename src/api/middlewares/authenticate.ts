import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../../config/db';

interface AuthenticatedRequest extends Request {
  user?: any;
}

async function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Token not provided' });
    }
    
    const decoded = jwt.verify(token, 'secret-key') as {id: string };

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      include: {
        companies: {
          include: {
            buisnessPlan: true,
            financialForecast:true,
            pitchDeck:true
          },
        },
      },
    });

    
    const result = {
      author_id: user?.id,
      role: user?.role
    }
    
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    req.user = result;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Unauthorized: Token expired' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({ message: 'Unauthorized: Invalid token' });
    } else {
        console.log(error)
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default authenticate;