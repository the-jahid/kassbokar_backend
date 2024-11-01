import { Request, Response, NextFunction } from 'express';
import { createBestCaseScenarioService, getBestCaseScenarioService, updateBestCaseScenarioService, deleteBestCaseScenarioService } from '../../services/financialForecasts/bestCaseScenario';

export interface AuthenticatedRequest extends Request {
    user?: any;
}

export const createBestCaseScenarioController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;
    const inputData = { ...req.body };

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the best case scenario.' });
    }

    if(financial_forecast_id.startsWith(':')){
        financial_forecast_id = financial_forecast_id.replace(':', '')
    } 

    try {
        const bestCaseScenario = await createBestCaseScenarioService(financial_forecast_id, inputData);
        return res.status(201).json({ message: 'Successfully created best case scenario.', data:bestCaseScenario });
    } catch (error) {
        console.error('Error creating best case scenario:', error);
        next(error);
    }
}; 

export const getBestCaseScenarioController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the best case scenario.' });
    }

    if(financial_forecast_id.startsWith(':')){
        financial_forecast_id = financial_forecast_id.replace(':', '')
    } 

    try {
        const bestCaseScenario = await getBestCaseScenarioService(financial_forecast_id);
        return res.status(200).json({ message: 'Successfully retrieved best case scenario.', data:bestCaseScenario });
    } catch (error) {
        
        next(error);
    }
};

export const updateBestCaseScenarioController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;
    const inputData = { ...req.body };

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the best case scenario.' });
    }

    if (financial_forecast_id.startsWith(':')) {
        financial_forecast_id = financial_forecast_id.replace(':', '');
    }

    try {
        const bestCaseScenario = await updateBestCaseScenarioService(financial_forecast_id, inputData);
        return res.status(200).json({ message: 'Successfully updated best case scenario.', bestCaseScenario });
    } catch (error) {
        console.error('Error updating best case scenario:', error);
        next(error);
    }
};

export const deleteBestCaseScenarioController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the best case scenario.' });
    }

    if (financial_forecast_id.startsWith(':')) {
        financial_forecast_id = financial_forecast_id.replace(':', '');
    }

    try {
        await deleteBestCaseScenarioService(financial_forecast_id);
        return res.status(200).json({ message: 'Successfully deleted best case scenario.' });
    } catch (error) {
        console.error('Error deleting best case scenario:', error);
        next(error);
    }
};

