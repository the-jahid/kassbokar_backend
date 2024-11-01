import {Request, Response, NextFunction} from 'express'
import { createCompanyService, deleteCompanyService, getallCompaniesService, getSingleCompanieService, updateCompanyService } from '../services/companies';
import error from '../../utils/error';
import checkRequiredFields from '../../utils/helpers/checkRequiredFields';
import prisma from '../../config/db';
import { createExpertiseService, deleteExpertiseService, getAllExpertiseService, updateExpertiseService } from '../services/expertise';


export interface AuthenticatedRequest extends Request {
    user?: any;
  }
  
export const getallExpertiseController = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {
        

        try {
            const expertises = await  getAllExpertiseService();

            return res.status(200).json({message:'Successfully fetched the list of executives', expertises})
        } catch (error) {
            next(error)
        }
}



export const createExpertiseController = async (req:AuthenticatedRequest, res:Response, next:NextFunction): Promise<Response | void> => {
   

    const { image_url, name, price_per_hour } = req?.body;


    checkRequiredFields({ image_url, name, price_per_hour }, res);

    try {
        
        if (typeof price_per_hour !== 'number') {
            throw error('The price per hour must be a numeric value', 400);
        }

        const expertise = await createExpertiseService(image_url, name, price_per_hour)

        return res.status(200).json({message:"Comapnay created successfuly", expertise});
    } catch (error) {
        next(error)
    }

}

export const updatExpertiseController = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {
    
    const { image_url, name, price_per_hour } = req?.body;
    let {expertise_id} = req?.params

    if(expertise_id){
        expertise_id = expertise_id.replace(':', '')
    }

    checkRequiredFields({ image_url, name, price_per_hour, expertise_id }, res);

    try {
        if (typeof price_per_hour !== 'number') {
            throw error('The price per hour must be a numeric value', 400);
        }

        const expertise = await updateExpertiseService(image_url, name, price_per_hour, expertise_id)
        return res.status(200).json({message:'Expertise updated successfully', expertise})
        
    } catch (error) {
        next(error)
    }
}

export const deletExpertiseController = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {
    let {expertise_id} = req?.params
    
    if(expertise_id){
        expertise_id = expertise_id.replace(':', '')
    }
    checkRequiredFields({ expertise_id }, res);

   
    try {
        const deletedCompany = await deleteExpertiseService(expertise_id);
        return res.status(200).json({message:'Expertise deleted successfully', deletedCompany})

    } catch (error) {
        next(error)
    }

}






