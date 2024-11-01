import { Router } from "express";
import { createAnnualFinancialController, deleteAnnualFinancialController, getAnnualFinancialController, updateAnnualFinancialController } from "../../controllers/financialForecasts/annualFinancial";

const annualFinancialRoute = Router();

annualFinancialRoute.get('/:financial_forecast_id', getAnnualFinancialController)
annualFinancialRoute.post('/:financial_forecast_id', createAnnualFinancialController )
annualFinancialRoute.patch('/:financial_forecast_id', updateAnnualFinancialController )
annualFinancialRoute.delete('/:financial_forecast_id',  deleteAnnualFinancialController )

export default annualFinancialRoute;



