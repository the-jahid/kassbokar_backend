import { Router } from "express";
import { createProjectedBalanceSheetController, deleteProjectedBalanceSheetController, getProjectedBalanceSheetController, updateProjectedBalanceSheetController } from "../../controllers/financialForecasts/projectedBalanceSheet";

const projectedBalanceSheetRoute = Router();

projectedBalanceSheetRoute.get('/:financial_forecast_id', getProjectedBalanceSheetController);
projectedBalanceSheetRoute.post('/:financial_forecast_id', createProjectedBalanceSheetController);
projectedBalanceSheetRoute.patch('/:financial_forecast_id', updateProjectedBalanceSheetController);
projectedBalanceSheetRoute.delete('/:financial_forecast_id', deleteProjectedBalanceSheetController);

export default projectedBalanceSheetRoute;