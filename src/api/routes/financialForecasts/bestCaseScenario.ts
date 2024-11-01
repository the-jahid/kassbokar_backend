import { Router } from "express";
import { createBestCaseScenarioController, deleteBestCaseScenarioController, getBestCaseScenarioController, updateBestCaseScenarioController } from "../../controllers/financialForecasts/bestCaseScenario";

const bestCaseScenarioRoute = Router();

bestCaseScenarioRoute.get('/:financial_forecast_id', getBestCaseScenarioController)
bestCaseScenarioRoute.post('/:financial_forecast_id', createBestCaseScenarioController )
bestCaseScenarioRoute.patch('/:financial_forecast_id', updateBestCaseScenarioController )
bestCaseScenarioRoute.delete('/:financial_forecast_id',  deleteBestCaseScenarioController )

export default bestCaseScenarioRoute;