import { Router } from "express";
import { createRevenueAssumptionController, deleteRevenueAssumptionController, getRevenueAssumptionController, updateRevenueAssumptionController } from "../../controllers/financialForecasts/revenueAssumptions";

const revenueAssumptionroute = Router();

revenueAssumptionroute.get('/:financial_forecast_id', getRevenueAssumptionController)
revenueAssumptionroute.post('/:financial_forecast_id',  createRevenueAssumptionController)
revenueAssumptionroute.patch('/:financial_forecast_id', updateRevenueAssumptionController);
revenueAssumptionroute.delete('/:financial_forecast_id',  deleteRevenueAssumptionController);

export default revenueAssumptionroute;
