import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../../config/db';
import error from '../../utils/error';

interface AuthenticatedRequest extends Request {
  user?: any;
}

async function authenticateAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
        const role = req?.user?.role;

        if (role === 'SUPERADMIN') {
            next();
        } else {
            return res.status(403).json({ message: 'You do not have the necessary Super Admin privileges to perform this operation' });
        }
    } catch (err) {
        throw error('An error occurred while authenticating the admin', 500);
    }
  
  
}

export default authenticateAdmin;