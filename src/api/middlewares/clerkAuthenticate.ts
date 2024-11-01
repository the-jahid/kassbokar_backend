import { Request, Response, NextFunction } from 'express';
import { clerkClient } from '@clerk/clerk-sdk-node';
import prisma from '../../config/db';
import error from '../../utils/error';

interface AuthenticatedRequest extends Request {
  user?: any;
}

const clerkAuthenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const sessionToken = req.headers.authorization?.split(' ')[1];
   


    if (!sessionToken) {
      return res.status(401).json({ message: 'Unauthorized: Session token not provided' });
    }

    const response = await clerkClient.verifyToken(sessionToken)


 
   
    const user = await prisma.user.findUnique({
      where: {
        oauthId: response.sub
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

    

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    const result = {
      author_id: user?.id,
      role: user?.role,
      username: user?.username
    }

   

    req.user = result;
    next();

   
  } catch (error) {
    console.error('Error verifying session token:', error);
    return res.status(500).json({ message: 'Not authorized' });
  }
};

export default clerkAuthenticate;




