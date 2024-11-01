import prisma from "../../config/db";
import { createAuthData } from "../../utils/helpers/authHelper";
import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import { loginService, registerService } from "../services/auth";

interface AuthenticatedRequest extends Request {
    user?: any;
  }
  
const registerController = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    const {email, oauthId} = req.body;

    if(!email  || !oauthId){
        return res.status(400).json({message:"Invalid data"})
    }
    
    try {
        const user = await registerService(email,oauthId);
        return res.status(201).json({ message: 'User Created Successfully', user });
    } catch (error) {
        next(error)  
    }
}

const loginController = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    const {email, oauthId} = req.body;
    
    try {
        const token = await loginService(email, oauthId, res);
        return res.status(200).json({message:'Login Successull', token})
    } catch (error) {
        next(error)
    }

}

export {
    registerController,
    loginController
}







