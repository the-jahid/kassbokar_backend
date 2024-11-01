import {Request, Response, NextFunction} from 'express'
import { createStrategyImplementationService, deleteStrategyImplementationService, getStrategyImplementationService, updateStrategyImplementationService } from '../../services/buisnessPlan/strategyImplementation';

export interface AuthenticatedRequest extends Request {
    user?: any;
  }

export const createStrategyImplementationcontroller = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {

    let {buisness_plan_id} = req?.params;
    const inputData = {...req.body}
    
    if (!buisness_plan_id || !inputData) {
        return res.status(400).json({ message: 'Both business plan ID and input data are necessary' });
    }

      if(buisness_plan_id.startsWith(':')) {
        buisness_plan_id = buisness_plan_id.replace(':', '')
    }

    try {  
        const StrategyImplementation = await createStrategyImplementationService(buisness_plan_id, inputData);
        return res.status(200).json({ message: 'Strategy implementation created successfully', data: StrategyImplementation });
    } catch (error) {
        next(error)
    }
}

export const getStrategyImplementationcontroller = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {

    let {buisness_plan_id} = req?.params;

    if (!buisness_plan_id) {
        return res.status(400).json({ message: 'Business plan ID is missing' });
    }

    if(buisness_plan_id.startsWith(':')) {
        buisness_plan_id = buisness_plan_id.replace(':', '')
    }

    try {    
        const StrategyImplementation = await getStrategyImplementationService(buisness_plan_id)

        return res.status(200).json({ message: 'Strategy implementation retrieved successfully', data: StrategyImplementation });
    } catch (error) {
        next(error)
    }
}

export const updateStrategyImplementationcontroller = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {

    let {  strategy_implementation_id } = req?.params;
    

    if(!strategy_implementation_id) {
        return res.status(400).json({ message: 'Strategy implementation ID is mandatory' });
    }

    if (strategy_implementation_id.startsWith(':')) {
        strategy_implementation_id = strategy_implementation_id.replace(':', '');
    }


    const {
        management_team,
        swot_analysis,
        pestle_analysis
      } = req.body;
    
    try {
        const StrategyImplementation = await updateStrategyImplementationService(management_team, swot_analysis, pestle_analysis, strategy_implementation_id)

        return res.status(200).json({ message: 'Strategy implementation updated successfully', data: StrategyImplementation });
    } catch (error) {
        next(error)
    }
}


export const deleteStrategyImplementationcontroller = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {
    
    let {strategy_implementation_id} = req?.params;
    
    if(!strategy_implementation_id) {
        return res.status(400).json({ message: 'Strategy implementation ID is mandatory' });
    }
    
    if (strategy_implementation_id.startsWith(':')) {
    strategy_implementation_id = strategy_implementation_id.replace(':', '');
    }

    try {
        const StrategyImplementation = await deleteStrategyImplementationService(strategy_implementation_id);

        return res.status(200).json({
            message: 'Strategy implementation removed successfully',
            data: StrategyImplementation,
        });
        
    } catch (error) {
        next (error)
    }
} 
