import { Request, Response, NextFunction } from 'express';
import { createProjectedBalanceSheetService, getProjectedBalanceSheetService, updateProjectedBalanceSheetService, deleteProjectedBalanceSheetService } from '../../services/financialForecasts/projectedBalanceSheet';

export interface AuthenticatedRequest extends Request {
    user?: any;
}

export const createProjectedBalanceSheetController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;
    const inputData = { ...req.body };

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the projected balance sheet.' });
    }

    if (financial_forecast_id.startsWith(':')) {
        financial_forecast_id = financial_forecast_id.replace(':', '');
    }

    try {
        const projectedBalanceSheet = await createProjectedBalanceSheetService(financial_forecast_id, inputData);
        return res.status(201).json({ message: 'Successfully created projected balance sheet.', data: projectedBalanceSheet });
    } catch (error) {
        console.error('Error creating projected balance sheet:', error);
        next(error);
    }
};

export const getProjectedBalanceSheetController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the projected balance sheet.' });
    }

    if (financial_forecast_id.startsWith(':')) {
        financial_forecast_id = financial_forecast_id.replace(':', '');
    }

    try {
        const projectedBalanceSheet = await getProjectedBalanceSheetService(financial_forecast_id);
        return res.status(200).json({ message: 'Successfully retrieved projected balance sheet.', data: projectedBalanceSheet });
    } catch (error) {
        next(error);
    }
};

export const updateProjectedBalanceSheetController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;
    const inputData = { ...req.body };

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the projected balance sheet.' });
    }

    if (financial_forecast_id.startsWith(':')) {
        financial_forecast_id = financial_forecast_id.replace(':', '');
    }

    try {
        const projectedBalanceSheet = await updateProjectedBalanceSheetService(financial_forecast_id, inputData);
        return res.status(200).json({ message: 'Successfully updated projected balance sheet.', data: projectedBalanceSheet });
    } catch (error) {
        console.error('Error updating projected balance sheet:', error);
        next(error);
    }
};

export const deleteProjectedBalanceSheetController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the projected balance sheet.' });
    }

    if (financial_forecast_id.startsWith(':')) {
        financial_forecast_id = financial_forecast_id.replace(':', '');
    }

    try {
        await deleteProjectedBalanceSheetService(financial_forecast_id);
        return res.status(200).json({ message: 'Successfully deleted projected balance sheet.' });
    } catch (error) {
        console.error('Error deleting projected balance sheet:', error);
        next(error);
    }
};