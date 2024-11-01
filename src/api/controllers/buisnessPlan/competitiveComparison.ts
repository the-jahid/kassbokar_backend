import {Request, Response, NextFunction} from 'express'

import { createcompetitiveComparisonService, deletecompetitiveComparisonService, getcompetitiveComparisonService, updatecompetitiveComparisonService } from '../../services/buisnessPlan/competitiveComparison';


export interface AuthenticatedRequest extends Request {
    user?: any;
  }

export const createCompetitiveComparisoncontroller = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {

    let {buisness_plan_id} = req?.params;
    const inputData = {...req.body}
    
    if (!buisness_plan_id || !inputData) {
        return res.status(400).json({ message: 'Business plan ID and input data are required' });
    }
    
    if (buisness_plan_id.startsWith(':')) {
        buisness_plan_id = buisness_plan_id.replace(':', '');
    }

    try {  
        const CompetitiveComparison = await createcompetitiveComparisonService(buisness_plan_id, inputData);
        return res.status(200).json({message:'Successfully created competitve comparison', data:CompetitiveComparison })
    } catch (error) {
        next(error)
    }
}

export const getCompetitiveComparisoncontroller = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {

    let {buisness_plan_id} = req?.params;

    if (!buisness_plan_id) {
        return res.status(400).json({ message: 'Business plan ID is missing' });
    }
    
    if (buisness_plan_id.startsWith(':')) {
        buisness_plan_id = buisness_plan_id.replace(':', '');
    }
    
    try {    
        const CompetitiveComparison = await getcompetitiveComparisonService(buisness_plan_id)

        return res.status(200).json({ message: 'Competitive comparison retrieved successfully', data:CompetitiveComparison });
    } catch (error) {
        next(error)
    }
}

export const updateCompetitiveComparisoncontroller = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {

    let {  competitive_comparison_id } = req.params;

    if(!competitive_comparison_id) {
        return res.status(400).json({ message: 'Competitive comparison ID is mandatory' });
    }

    if (competitive_comparison_id.startsWith(':')) {
        competitive_comparison_id = competitive_comparison_id.replace(':', '');
    }

    const {
        competitors,
        competitive_advantage
      } = req.body;
    
    
    try {
            
        const CompetitiveComparison = await updatecompetitiveComparisonService( competitors, competitive_advantage, competitive_comparison_id)

        return res.status(200).json({ message: 'Competitive comparison updated successfully', data: CompetitiveComparison });
    } catch (error) {
        next(error)
    }
}


export const deleteCompetitiveComparisoncontroller = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {
    
    let {competitive_comparison_id} = req.params;
    
    if (!competitive_comparison_id) {
        return res.status(400).json({ message: 'Competitive comparison ID is mandatory' });
    }
      if (competitive_comparison_id.startsWith(':')) {
        competitive_comparison_id = competitive_comparison_id.replace(':', '');
      }

    try {
        const CompetitiveComparison = await deletecompetitiveComparisonService(competitive_comparison_id);

        return res.status(200).json({
            message: 'Competitive comparison removed successfully',
            data: CompetitiveComparison,
        });
        
    } catch (error) {
        next (error)
    }
} 
