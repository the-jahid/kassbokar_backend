import {Request, Response, NextFunction} from 'express'
import { createCompanyService, deleteCompanyService, getallCompaniesService, getSingleCompanieService, updateCompanyService } from '../services/companies';
import error from '../../utils/error';
import checkRequiredFields from '../../utils/helpers/checkRequiredFields';


export interface AuthenticatedRequest extends Request {
    user?: any;
  }
  
export const getallCompaniesController = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {
        const {author_id} = req.user;

        try {
            const companies = await  getallCompaniesService(author_id);

            return res.status(200).json({message:'successfully get the company list', companies})
        } catch (error) {
            next(error)
        }
}

export const getSingleCompanieController = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {
    let {company_id} = req.params

    if(company_id.startsWith(':')){
        company_id = company_id.replace(':', '')
    }

    try {
        const companies = await  getSingleCompanieService(company_id);

        return res.status(200).json({message:'Successfully get the company', data:companies})
    } catch (error) {
        next(error)
    }
}


export const createCompanyController = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {
    const { company_title, image, description } = req?.body;

    const { author_id } = req?.user;

    checkRequiredFields({ company_title, image, description }, res);

    if (!author_id) {
       
        return res.status(400).json({message:"Missing author_id in request user"})
    }
    
    try {
        const company =  await createCompanyService(company_title,  image, description, author_id);

        return res.status(200).json({message:"Comapnay created successfuly", company});
    } catch (error) {
        next(error)
    }

}

export const updateCompanyController = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {
    let {company_id} = req?.params;

    const {company_title, image, description} = req.body;
    
    if(company_id.startsWith(':')){
        company_id = company_id.replace(':', '')
    }

    checkRequiredFields({ company_title, image, description }, res);
   
    try {
        const company = await updateCompanyService(company_id, image, description, company_title);
        return res.status(200).json({message:'updated successfully', company})
        
    } catch (error) {
        next(error)
    }
}

export const deleteCompanyController = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {
    let {company_id} = req?.params;

    if(company_id.startsWith(':')){
        company_id= company_id.replace(':', '')
    }
    
    checkRequiredFields({ company_id }, res);

    try {
        const deletedCompany = await deleteCompanyService(company_id);
        return res.status(200).json({message:'deleted successfully', deletedCompany})

    } catch (error) {
        next(error)
    }

}






