import { Request, Response, NextFunction } from 'express';

import { createworstCaseScenarioService, deleteworstCaseScenarioService, getworstCaseScenarioService, updateworstCaseScenarioService } from '../../services/financialForecasts/worstCaseScenario';

export interface AuthenticatedRequest extends Request {
    user?: any;
}

export const createWorstCaseScenarioController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;
    const inputData = { ...req.body };

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the worst case scenario.' });
    }

    if(financial_forecast_id.startsWith(':')){
        financial_forecast_id = financial_forecast_id.replace(':', '')
    } 

    try {
        const worstCaseScenario = await createworstCaseScenarioService(financial_forecast_id, inputData);
        return res.status(201).json({ message: 'Successfully created worst case scenario.', data:worstCaseScenario });
    } catch (error) {
        console.error('Error creating worst case scenario:', error);
        next(error);
    }
};

export const getWorstCaseScenarioController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the worst case scenario.' });
    }

    if(financial_forecast_id.startsWith(':')){
        financial_forecast_id = financial_forecast_id.replace(':', '')
    } 

    try {
        const worstCaseScenario = await getworstCaseScenarioService(financial_forecast_id);
        return res.status(200).json({ message: 'Successfully retrieved worst case scenario.', data:worstCaseScenario });
    } catch (error) {
        
        next(error);
    }
};

export const updateWorstCaseScenarioController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;
    const inputData = { ...req.body };

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the worst case scenario.' });
    }

    if (financial_forecast_id.startsWith(':')) {
        financial_forecast_id = financial_forecast_id.replace(':', '');
    }

    try {
        const worstCaseScenario = await updateworstCaseScenarioService(financial_forecast_id, inputData);
        return res.status(200).json({ message: 'Successfully updated worst case scenario.', worstCaseScenario });
    } catch (error) {
        console.error('Error updating worst case scenario:', error);
        next(error);
    }
};

export const deleteWorstCaseScenarioController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the worst case scenario.' });
    }

    if (financial_forecast_id.startsWith(':')) {
        financial_forecast_id = financial_forecast_id.replace(':', '');
    }

    try {
        await deleteworstCaseScenarioService(financial_forecast_id);
        return res.status(200).json({ message: 'Successfully deleted worst case scenario.' });
    } catch (error) {
        console.error('Error deleting worst case scenario:', error);
        next(error);
    }
};

