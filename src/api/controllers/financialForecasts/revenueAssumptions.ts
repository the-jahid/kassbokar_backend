import { Request, Response, NextFunction } from 'express';
import { createRevenueAssumptionService,  deleteRevenueAssumptionService,  getRevenueAssumptionService, updateRevenueAssumptionService } from '../../services/financialForecasts/revenueAssumption';

export interface AuthenticatedRequest extends Request {
    user?: any;
}

export const createRevenueAssumptionController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;
    const inputData = { ...req.body };
    
    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the revenue assumption.' });
    }

    if (financial_forecast_id.startsWith(':')) {
        financial_forecast_id = financial_forecast_id.replace(':', '');
    }

    try {
        const revenueAssumption = await createRevenueAssumptionService(financial_forecast_id, inputData);
        return res.status(201).json({ message: 'Successfully created revenue assumption.', data: revenueAssumption });
    } catch (error) {
        console.error('Error creating revenue assumption:', error);
        next(error);
    }
};

export const getRevenueAssumptionController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the revenue assumption.' });
    }

    if (financial_forecast_id.startsWith(':')) {
        financial_forecast_id = financial_forecast_id.replace(':', '');
    }
    
    try {
        const revenueAssumption = await getRevenueAssumptionService(financial_forecast_id);
        return res.status(200).json({ message: 'Successfully retrieved revenue assumption.', data: revenueAssumption });
    } catch (error) {
        next(error);
    }
};

export const updateRevenueAssumptionController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;
    const inputData = { ...req.body };

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the revenue assumption.' });
    }

    if (financial_forecast_id.startsWith(':')) {
        financial_forecast_id = financial_forecast_id.replace(':', '');
    }

    try {
        const revenueAssumption = await updateRevenueAssumptionService(financial_forecast_id, inputData);
        return res.status(200).json({ message: 'Successfully updated revenue assumption.', data: revenueAssumption });
    } catch (error) {
        console.error('Error updating revenue assumption:', error);
        next(error);
    }
};

export const deleteRevenueAssumptionController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the revenue assumption.' });
    }

    if (financial_forecast_id.startsWith(':')) {
        financial_forecast_id = financial_forecast_id.replace(':', '');
    }

    try {
        await deleteRevenueAssumptionService(financial_forecast_id);
        return res.status(200).json({ message: 'Successfully deleted revenue assumption.' });
    } catch (error) {
        console.error('Error deleting revenue assumption:', error);
        next(error);
    }
};