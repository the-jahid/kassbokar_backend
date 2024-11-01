import { Request, Response, NextFunction } from 'express';
import { createExpenseAssumptionService, deleteExpenseAssumptionService, getExpenseAssumptionService, updateExpenseAssumptionService } from '../../services/financialForecasts/expenseAssumption';


export interface AuthenticatedRequest extends Request {
    user?: any;
}

export const createExpenseAssumptionController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;
    const inputData = { ...req.body };

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the expense assumption.' });
    }

    if (financial_forecast_id.startsWith(':')) {
        financial_forecast_id = financial_forecast_id.replace(':', '');
    }

    try {
        const expenseAssumption = await createExpenseAssumptionService(financial_forecast_id, inputData);
        return res.status(201).json({ message: 'Successfully created expense assumption.', data: expenseAssumption });
    } catch (error) {
        console.error('Error creating expense assumption:', error);
        next(error);
    }
};

export const getExpenseAssumptionController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the expense assumption.' });
    }

    if (financial_forecast_id.startsWith(':')) {
        financial_forecast_id = financial_forecast_id.replace(':', '');
    }
    
    try {
        const expenseAssumption = await getExpenseAssumptionService(financial_forecast_id);
        return res.status(200).json({ message: 'Successfully retrieved expense assumption.', data: expenseAssumption });
    } catch (error) {
        next(error);
    }
};

export const updateExpenseAssumptionController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;
    const inputData = { ...req.body };

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the expense assumption.' });
    }

    if (financial_forecast_id.startsWith(':')) {
        financial_forecast_id = financial_forecast_id.replace(':', '');
    }

    try {
        const expenseAssumption = await updateExpenseAssumptionService(financial_forecast_id, inputData);
        return res.status(200).json({ message: 'Successfully updated expense assumption.', data: expenseAssumption });
    } catch (error) {
        console.error('Error updating expense assumption:', error);
        next(error);
    }
};

export const deleteExpenseAssumptionController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the expense assumption.' });
    }

    if (financial_forecast_id.startsWith(':')) {
        financial_forecast_id = financial_forecast_id.replace(':', '');
    }

    try {
        await deleteExpenseAssumptionService(financial_forecast_id);
        return res.status(200).json({ message: 'Successfully deleted expense assumption.' });
    } catch (error) {
        console.error('Error deleting expense assumption:', error);
        next(error);
    }
};


