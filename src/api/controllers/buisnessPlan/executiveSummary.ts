

import {Request, Response, NextFunction} from 'express'
import { createExecutiveSummaryService, deleteExecutiveSummaryService, getExecutiveSummaryService, updateExecutiveSummaryService } from "../../services/buisnessPlan/executiveSummary";

import error from "../../../utils/error";

export interface AuthenticatedRequest extends Request {
    user?: any;
  }

export const createExecutiveSummarycontroller = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {

    let { buisness_plan_id } = req?.params;
    const inputData = { ...req.body };


    if (buisness_plan_id.startsWith(':')) {
        buisness_plan_id = buisness_plan_id.replace(':', '');
    }
    
   if (!buisness_plan_id || !inputData) {
    return res.status(400).json({ message: 'Business plan ID and input data are required' });
}

    try {  
        const executiveSummary = await createExecutiveSummaryService(buisness_plan_id, inputData);
        return res.status(200).json({message:'Executive summary created successfully', data:executiveSummary })
    } catch (error) {
        next(error)
    }
}


    export const getExecutiveSummarycontroller = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {

        let {buisness_plan_id} = req?.params;

        if (!buisness_plan_id) {
            throw error('Business plan ID is required', 400);
        }

        if(buisness_plan_id.startsWith(':')) {
            buisness_plan_id = buisness_plan_id.replace(':', '')
        }

        try {    
            const executiveSummary = await getExecutiveSummaryService(buisness_plan_id)

            return res.status(200).json({ message: 'Executive summary retrieved successfully', data: executiveSummary });
        } catch (error) {
            next(error)
        }
    }

export const updateExecutiveSummarycontroller = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {

    let { executive_summary_id } = req?.params;

    if (executive_summary_id.startsWith(':')) {
      executive_summary_id = executive_summary_id.replace(':', '');
    }

    const {
        problem_statement,
        proposed_solution,
        value_proposition,
        three_years_objective,
        keys_to_success,
      } = req.body;
    
    
    try {
            
        const executiveSummary = await updateExecutiveSummaryService( problem_statement, proposed_solution, value_proposition, three_years_objective, keys_to_success, executive_summary_id)

        return res.status(200).json({ message: 'Executive summary updated successfully', data: executiveSummary });
    } catch (error) {
        next(error)
    }
}


export const deleteExecutiveSummarycontroller = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {
    
    let {executive_summary_id} = req?.params;

    if (!executive_summary_id) {
        throw error('Executive summary ID is mandatory', 400);
    }
    
    if (executive_summary_id.startsWith(':')) {
    executive_summary_id = executive_summary_id.replace(':', '');
    }

    try {
        const executiveSummary = await deleteExecutiveSummaryService(executive_summary_id);

        return res.status(200).json({
            message: 'Executive Summary deleted successfully',
            data: executiveSummary,
          });
        
    } catch (error) {
        next(error)
    }
} 





