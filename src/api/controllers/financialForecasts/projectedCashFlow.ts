import { Request, Response, NextFunction } from 'express';
import { createProjectedCashFlowService, getProjectedCashFlowService, updateProjectedCashFlowService, deleteProjectedCashFlowService } from '../../services/financialForecasts/projectedCashFlow';

export interface AuthenticatedRequest extends Request {
    user?: any;
}

export const createProjectedCashFlowController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;
    const inputData = { ...req.body };

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the projected cash flow.' });
    }

    if (financial_forecast_id.startsWith(':')) {
        financial_forecast_id = financial_forecast_id.replace(':', '');
    }

    try {
        const projectedCashFlow = await createProjectedCashFlowService(financial_forecast_id, inputData);
        return res.status(201).json({ message: 'Successfully created projected cash flow.', data: projectedCashFlow });
    } catch (error) {
        console.error('Error creating projected cash flow:', error);
        next(error);
    }
};

export const getProjectedCashFlowController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the projected cash flow.' });
    }

    if (financial_forecast_id.startsWith(':')) {
        financial_forecast_id = financial_forecast_id.replace(':', '');
    }

    try {
        const projectedCashFlow = await getProjectedCashFlowService(financial_forecast_id);
        return res.status(200).json({ message: 'Successfully retrieved projected cash flow.', data: projectedCashFlow });
    } catch (error) {
        next(error);
    }
};

export const updateProjectedCashFlowController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;
    const inputData = { ...req.body };

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the projected cash flow.' });
    }

    if (financial_forecast_id.startsWith(':')) {
        financial_forecast_id = financial_forecast_id.replace(':', '');
    }

    try {
        const projectedCashFlow = await updateProjectedCashFlowService(financial_forecast_id, inputData);
        return res.status(200).json({ message: 'Successfully updated projected cash flow.', data: projectedCashFlow });
    } catch (error) {
        console.error('Error updating projected cash flow:', error);
        next(error);
    }
};

export const deleteProjectedCashFlowController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the projected cash flow.' });
    }

    if (financial_forecast_id.startsWith(':')) {
        financial_forecast_id = financial_forecast_id.replace(':', '');
    }

    try {
        await deleteProjectedCashFlowService(financial_forecast_id);
        return res.status(200).json({ message: 'Successfully deleted projected cash flow.' });
    } catch (error) {
        console.error('Error deleting projected cash flow:', error);
        next(error);
    }
};