import { Router } from "express";
import { createFinancialForeCastController, deleteFinancialForecastController, getFinancialForecastController } from "../../controllers/financialForecasts";

const financialForecast = Router();

financialForecast.get('/:company_id', getFinancialForecastController );
financialForecast.post('/:company_id', createFinancialForeCastController);
financialForecast.patch('/:financial_forecast_id',  );
financialForecast.delete('/:financial_forecast_id', deleteFinancialForecastController );

export default financialForecast;



