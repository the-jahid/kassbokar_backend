import { Request, Response, NextFunction } from 'express';
import { createfinancialForecastService, deletefinancialForecastService, getfinancialForecastService } from '../../services/financialForecasts';
import { getBuisnessPlanService } from '../../services/buisnessPlan';


export interface AuthenticatedRequest extends Request {
    user?: any;
}

export const createFinancialForeCastController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    let {company_id} = req?.params

    const inputData = { ...req.body };

    if (company_id.startsWith(':')) {
        company_id = company_id.replace(':', '');
    }

    if (!company_id) {
        return res.status(400).json({ message: 'Company ID is required to create a business plan.' });
    }

    try {
        const financialForecast = await createfinancialForecastService(inputData, company_id);
        
        return res.status(200).json({message:'Financial forecast created Successfully', financialForecast})
    } catch (error) {
        next(error)
    }
    
}





export const getFinancialForecastController = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {
    let {company_id} = req?.params
    
    if(!company_id ){
        return res.status(400).json({message:"Company id is required"})
    }
    
    if (company_id.startsWith(':')) {
        company_id = company_id.replace(':', '');
    }

    try {
        const financialForecast = await getfinancialForecastService(company_id)
        
        return res.status(200).json({ message: 'Financial forecast successfully retrieved', data:financialForecast });
        
    } catch (error) {
        next(error)
    }
}

export const deleteFinancialForecastController = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {
       
    let {financial_forecast_id} = req.params

    if(!financial_forecast_id ){
        return res.status(400).json({message:'Financial forecast id  is not given'})
    }

    if(financial_forecast_id.startsWith(':')){
        financial_forecast_id = financial_forecast_id.replace(':', "")
    }

    try {
        const financialForecast = await deletefinancialForecastService(financial_forecast_id);
        
        return res.status(200).json({message:'Financial forecast deleted sucessfully', data:financialForecast})
        
    } catch (error) {
        next(error)
    }

}












