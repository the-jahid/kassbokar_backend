import { Request, Response, NextFunction } from 'express';
import { createUseofFundsService, getUseofFundsService, updateUseofFundsService, deleteUseofFundsService } from '../../services/financialForecasts/useofFunds';

export interface AuthenticatedRequest extends Request {
    user?: any;
}

export const createUseofFundsController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;
    const inputData = { ...req.body };

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the use of funds.' });
    }
    
    if(financial_forecast_id.startsWith(':')){
        financial_forecast_id = financial_forecast_id.replace(':', '')
    } 

    try {
        const useofFunds = await createUseofFundsService(financial_forecast_id, inputData);
        return res.status(200).json({ message: 'Successfully created use of funds.', useofFunds });
    } catch (error) {
        next(error);
    }
};

export const getUseofFundsController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.params;

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the use of funds.' });
    }

    if(financial_forecast_id.startsWith(':')){
        financial_forecast_id = financial_forecast_id.replace(':', '')
    } 
    
    try {
        const useofFunds = await getUseofFundsService(financial_forecast_id);
        return res.status(200).json({ message: 'Successfully retrieved use of funds.', data:useofFunds });
    } catch (error) {
        next(error);
    }
};

export const updateUseofFundsController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { useof_fund_id } = req?.params;
    const inputData = { ...req.body};

    if(Object.keys(inputData).length === 0 ){
        return res.status(400).json({ message: 'Input data cannot be empty' });
    }

    for (const [key, value] of Object.entries(inputData)) {
        if (typeof value !== 'number') {
            return res.status(400).json({ message: `${key} must be a numeric value` });
        }
    }

    if (!useof_fund_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the use of funds.' });
    }

    if (useof_fund_id.startsWith(':')) {
        useof_fund_id = useof_fund_id.replace(':', '');
    }

    try {
        const useofFunds = await updateUseofFundsService(useof_fund_id, inputData);
        return res.status(200).json({ message: 'Successfully updated use of funds.', useofFunds });
    } catch (error) {
        next(error);
    }
};

export const deleteUseofFundsController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    
    let { useof_fund_id } = req?.params;
    if (!useof_fund_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the use of funds.' });
    }

    if (useof_fund_id.startsWith(':')) {
        useof_fund_id = useof_fund_id.replace(':', '');
    }

    try {
        await deleteUseofFundsService(useof_fund_id);
        return res.status(200).json({ message: 'Successfully deleted use of funds.' });
    } catch (error) {
        next(error);
    }
};