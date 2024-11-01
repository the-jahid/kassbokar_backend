import {Request, Response, NextFunction} from 'express'
import { createBuisnessPlanService, deleteBuisnessPlanService, getBuisnessPlanService } from '../../services/buisnessPlan';

export interface AuthenticatedRequest extends Request {
    user?: any;
  }

export const createBuisnessplanController = async (req:AuthenticatedRequest, res:Response,next:NextFunction) => {
    let {company_id} = req?.params
    
    if (company_id  == 'undefined') {
        return res.status(400).json({ message: 'Company ID is required to create a business plan.' });
    } 

   
    if (company_id.startsWith(':')) {
        company_id = company_id.replace(':', '');
    }

    const inputData = {...req.body}


    try {
        const buisnessPlan = await createBuisnessPlanService(inputData, company_id)
        
        return res.status(200).json({message:'Buisness Plan created Successfully', buisnessPlan})
        
    } catch (error) {
        next(error)
    }
}

export const getBuisnessPlanController = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {
        let {company_id} = req?.params
        
       

        if(!company_id ){
            return res.status(400).json({message:"Company id is required"})
        }
        
        if (company_id.startsWith(':')) {
            company_id = company_id.replace(':', '');
        }

        try {
            const buisnessPlan = await getBuisnessPlanService(company_id)
            
            return res.status(200).json({message:'Buisness Plan get Successfully', buisnessPlan})
            
        } catch (error) {
            next(error)
        }
}

export const deleteBuisnessPlanController = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {
       
    let {buisness_plan_id} = req.params

    if(!buisness_plan_id ){
        return res.status(400).json({message:'Buisness plan id  is not given'})
    }

    if(buisness_plan_id.startsWith(':')){
        buisness_plan_id = buisness_plan_id.replace(':', "")
    }

    try {
        const buisnessPlan = await deleteBuisnessPlanService(buisness_plan_id);
        
        return res.status(200).json({message:'Buisness Plan deleted sucessfully', buisnessPlan})
        
    } catch (error) {
        next(error)
    }

}

