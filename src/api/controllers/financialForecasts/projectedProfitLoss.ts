import { Request, Response, NextFunction } from 'express';
import { createprojectedProfitLossService, getprojectedProfitLossService, updateprojectedProfitLossService, deleteprojectedProfitLossService } from '../../services/financialForecasts/projectedProfitLoss';

export interface AuthenticatedRequest extends Request {
    user?: any;
}

export const createProjectedProfitLossController= async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;
    const inputData = { ...req.body };

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the projected profit loss.' });
    }

    if(financial_forecast_id.startsWith(':')){
        financial_forecast_id = financial_forecast_id.replace(':', '')
    } 

    try {
        const projectedProfitLoss = await createprojectedProfitLossService(financial_forecast_id, inputData);
        return res.status(201).json({ message: 'Successfully created projected profit loss.', data:projectedProfitLoss });
    } catch (error) {
        console.error('Error creating projected profit loss:', error);
        next(error);
    }
};

export const getProjectedProfitLossController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the projected profit loss.' });
    }

    if(financial_forecast_id.startsWith(':')){
        financial_forecast_id = financial_forecast_id.replace(':', '')
    } 

    try {
        const projectedProfitLoss = await getprojectedProfitLossService(financial_forecast_id);
        return res.status(200).json({ message: 'Successfully retrieved projected profit loss.', data:projectedProfitLoss });
    } catch (error) {
        
        next(error);
    }
};

export const updateProjectedProfitLossController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;
    const inputData = { ...req.body };

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the projected profit loss.' });
    }

    if (financial_forecast_id.startsWith(':')) {
        financial_forecast_id = financial_forecast_id.replace(':', '');
    }

    try {
        const projectedProfitLoss = await updateprojectedProfitLossService(financial_forecast_id, inputData);
        return res.status(200).json({ message: 'Successfully updated projected profit loss.', projectedProfitLoss });
    } catch (error) {
        console.error('Error updating projected profit loss:', error);
        next(error);
    }
};

export const deleteProjectedProfitLossController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the projected profit loss.' });
    }

    if (financial_forecast_id.startsWith(':')) {
        financial_forecast_id = financial_forecast_id.replace(':', '');
    }

    try {
        await deleteprojectedProfitLossService(financial_forecast_id);
        return res.status(200).json({ message: 'Successfully deleted projected profit loss.' });
    } catch (error) {
        console.error('Error deleting projected profit loss:', error);
        next(error);
    }
};

