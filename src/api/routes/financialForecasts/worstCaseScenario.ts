import { Router } from "express";

import { createWorstCaseScenarioController, deleteWorstCaseScenarioController, getWorstCaseScenarioController, updateWorstCaseScenarioController } from "../../controllers/financialForecasts/worstCaseScenario";

const worstCaseScenarioRoute = Router();

worstCaseScenarioRoute.get('/:financial_forecast_id', getWorstCaseScenarioController);
worstCaseScenarioRoute.post('/:financial_forecast_id', createWorstCaseScenarioController);
worstCaseScenarioRoute.patch('/:financial_forecast_id', updateWorstCaseScenarioController);
worstCaseScenarioRoute.delete('/:financial_forecast_id', deleteWorstCaseScenarioController);

export default worstCaseScenarioRoute;


