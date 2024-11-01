import { Request, Response, NextFunction } from 'express';
import { createAnnualFinancialService, getAnnualFinancialService, updateAnnualFinancialService, deleteAnnualFinancialService } from '../../services/financialForecasts/annualFinancial';

export interface AuthenticatedRequest extends Request {
    user?: any;
}

export const createAnnualFinancialController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;
    const inputData = { ...req.body };

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the annual financial data.' });
    }

    if (financial_forecast_id.startsWith(':')) {
        financial_forecast_id = financial_forecast_id.replace(':', '');
    }

    try {
        const annualFinancial = await createAnnualFinancialService(financial_forecast_id, inputData);
        return res.status(201).json({ message: 'Successfully created annual financial data.', data: annualFinancial });
    } catch (error) {
        console.error('Error creating annual financial data:', error);
        next(error);
    }
};

export const getAnnualFinancialController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the annual financial data.' });
    }

    if (financial_forecast_id.startsWith(':')) {
        financial_forecast_id = financial_forecast_id.replace(':', '');
    }

    try {
        const annualFinancial = await getAnnualFinancialService(financial_forecast_id);
        return res.status(200).json({ message: 'Successfully retrieved annual financial data.', data: annualFinancial });
    } catch (error) {
        next(error);
    }
};

export const updateAnnualFinancialController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;
    const inputData = { ...req.body };

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the annual financial data.' });
    }

    if (financial_forecast_id.startsWith(':')) {
        financial_forecast_id = financial_forecast_id.replace(':', '');
    }

    try {
        const annualFinancial = await updateAnnualFinancialService(financial_forecast_id, inputData);
        return res.status(200).json({ message: 'Successfully updated annual financial data.', data: annualFinancial });
    } catch (error) {
        console.error('Error updating annual financial data:', error);
        next(error);
    }
};

export const deleteAnnualFinancialController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the annual financial data.' });
    }

    if (financial_forecast_id.startsWith(':')) {
        financial_forecast_id = financial_forecast_id.replace(':', '');
    }

    try {
        await deleteAnnualFinancialService(financial_forecast_id);
        return res.status(200).json({ message: 'Successfully deleted annual financial data.' });
    } catch (error) {
        console.error('Error deleting annual financial data:', error);
        next(error);
    }
};