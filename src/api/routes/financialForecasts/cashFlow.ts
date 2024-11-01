import { Router } from "express";
import { createProjectedCashFlowController, deleteProjectedCashFlowController, getProjectedCashFlowController, updateProjectedCashFlowController } from "../../controllers/financialForecasts/projectedCashFlow";

const projectedCashFlowRoute = Router();

projectedCashFlowRoute.get('/:financial_forecast_id', getProjectedCashFlowController);
projectedCashFlowRoute.post('/:financial_forecast_id', createProjectedCashFlowController);
projectedCashFlowRoute.patch('/:financial_forecast_id', updateProjectedCashFlowController);
projectedCashFlowRoute.delete('/:financial_forecast_id', deleteProjectedCashFlowController);

export default projectedCashFlowRoute;



