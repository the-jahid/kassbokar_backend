import prisma from "../../config/db";
import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import error from "../../utils/error";


const registerService = async (email:string, oauthId:string ) => {

    let user = await prisma.user.findUnique({
        where:{
            email: email,
        }
    })
    
    if(user){
        throw error('User already exists', 409)
    }

    user = await prisma.user.create({
    data:{
        email,
        oauthId:oauthId
    }

    })

    return user
}

const loginService = async (email:string, oauthId:string, res:Response) => {
    
        const user = await prisma.user.findUnique({
            where:{
                email:email,
                oauthId:oauthId
            }
        })

        if(!user) {
           throw error('Invalid Credential', 400);
        }

        const token = jwt.sign(user, 'secret-key', {expiresIn:'2h'})
        return token
    
}

export {
    registerService,
    loginService
}




