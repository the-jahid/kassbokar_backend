import { Request, Response, NextFunction } from 'express';
import { createRevenueForecastService, getRevenueForecastService, updateRevenueForecastService, deleteRevenueForecastService } from '../../services/financialForecasts/revenueForecast';

export interface AuthenticatedRequest extends Request {
    user?: any;
}

export const createRevenueForecastController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.user;
    const inputData = { ...req.body };

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the revenue forecast.' });
    }

    if(financial_forecast_id.startsWith(':')){
        financial_forecast_id = financial_forecast_id.replace(':', '')
    } 

    try {
        const revenueForecast = await createRevenueForecastService(financial_forecast_id, inputData);
        return res.status(200).json({ message: 'Successfully created revenue forecast.', revenueForecast });
    } catch (error) {
        next(error);
    }
};

export const getRevenueForecastController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { financial_forecast_id } = req?.user;

    if (!financial_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the revenue forecast.' });
    }

    if(financial_forecast_id.startsWith(':')){
        financial_forecast_id = financial_forecast_id.replace(':', '')
    } 
    try {
        const revenueForecast = await getRevenueForecastService(financial_forecast_id);
        return res.status(200).json({ message: 'Successfully retrieved revenue forecast.', revenueForecast });
    } catch (error) {
        next(error);
    }
};

export const updateRevenueForecastController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { revenue_forecast_id } = req?.params;
    const inputData = { ...req.body };

    if (!revenue_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the revenue forecast.' });
    }

    if (revenue_forecast_id.startsWith(':')) {
        revenue_forecast_id = revenue_forecast_id.replace(':', '');
    }

    try {
        const revenueForecast = await updateRevenueForecastService(revenue_forecast_id, inputData);
        return res.status(200).json({ message: 'Successfully updated revenue forecast.', revenueForecast });
    } catch (error) {
        next(error);
    }
};

export const deleteRevenueForecastController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { revenue_forecast_id } = req?.params;

    if (!revenue_forecast_id) {
        return res.status(400).json({ message: 'Generate a financial forecast to establish the revenue forecast.' });
    }

    if (revenue_forecast_id.startsWith(':')) {
        revenue_forecast_id = revenue_forecast_id.replace(':', '');
    }

    try {
        await deleteRevenueForecastService(revenue_forecast_id);
        return res.status(200).json({ message: 'Successfully deleted revenue forecast.' });
    } catch (error) {
        next(error);
    }
};