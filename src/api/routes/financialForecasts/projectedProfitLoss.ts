import { Router } from "express";
import { createProjectedProfitLossController, deleteProjectedProfitLossController, getProjectedProfitLossController, updateProjectedProfitLossController } from "../../controllers/financialForecasts/projectedProfitLoss";

const projectedProfitLossRoute = Router();

projectedProfitLossRoute.get('/:financial_forecast_id', getProjectedProfitLossController);
projectedProfitLossRoute.post('/:financial_forecast_id', createProjectedProfitLossController);
projectedProfitLossRoute.patch('/:financial_forecast_id', updateProjectedProfitLossController);
projectedProfitLossRoute.delete('/:financial_forecast_id', deleteProjectedProfitLossController);

export default projectedProfitLossRoute;