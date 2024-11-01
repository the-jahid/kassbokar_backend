import {Request, Response, NextFunction} from 'express'

import { createCompanyDescriptionService, deleteCompanyDescriptionService, getCompanyDescriptionService, updateCompanyDescriptionService } from "../../services/buisnessPlan/compnayDescription";

export interface AuthenticatedRequest extends Request {
    user?: any;
  }

    export const createCompanyDescriptioncontroller = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {

        let {buisness_plan_id} = req?.params;
        const inputData = {...req.body}
        
        if (!buisness_plan_id || !inputData) {
            return res.status(400).json({ message: 'Both business plan ID and input data are necessary' });
        }

        if(buisness_plan_id.startsWith(':')) {
            buisness_plan_id = buisness_plan_id.replace(':', '')
        }

        try {  
            const CompanyDescription = await createCompanyDescriptionService(buisness_plan_id, inputData);
            return res.status(200).json({ message: 'Company description created successfully', data: CompanyDescription });
        } catch (error) {
            next(error)
        }
    }

    export const getCompanyDescriptioncontroller = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {

        let {buisness_plan_id} = req?.params;

        if (!buisness_plan_id) {
            return res.status(400).json({ message: 'Business plan ID is missing' });
        }

        if(buisness_plan_id.startsWith(':')) {
            buisness_plan_id = buisness_plan_id.replace(':', '')
        }

        try {    
            const CompanyDescription = await getCompanyDescriptionService(buisness_plan_id)

            return res.status(200).json({ message: 'Company description retrieved successfully', data: CompanyDescription });
        } catch (error) {
            next(error)
        }
    }

export const updateCompanyDescriptioncontroller = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {

    let {  company_description_id } = req?.params;

    console.log('companyDescid', company_description_id)

    if(!company_description_id) {
        return res.status(400).json({ message: 'Company description ID is mandatory' });
    }

    if (company_description_id.startsWith(':')) {
        company_description_id = company_description_id.replace(':', '');
    }

    if (company_description_id.startsWith(':')) {
        company_description_id = company_description_id.replace(':', '');
    }
    const {
        overview,
        products,
        mission,
        vision,
        values,
      } = req.body;
      
    try {    
        const CompanyDescription = await updateCompanyDescriptionService( overview, products, mission, vision, values, company_description_id)

        return res.status(200).json({ message: 'Company description updated successfully', data: CompanyDescription});
    } catch (error) {
        next(error)
    }
}


export const deleteCompanyDescriptioncontroller = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {
    
    let {company_description_id} = req.params;
    
    if(!company_description_id) {
        return res.status(400).json({ message: 'Company description ID is mandatory' });
    }
    
      if (company_description_id.startsWith(':')) {
        company_description_id = company_description_id.replace(':', '');
      }

      if (company_description_id.startsWith(':')) {
        company_description_id = company_description_id.replace(':', '');
      }

    try {
        const CompanyDescription = await deleteCompanyDescriptionService(company_description_id);

        return res.status(200).json({
            message: 'Company description removed successfully',
            data: CompanyDescription,
        });
        
    } catch (error) {
        next (error)
    }
} 
