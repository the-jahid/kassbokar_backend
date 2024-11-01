import { Router } from "express";

import { createRevenueForecastController, deleteRevenueForecastController, getRevenueForecastController, updateRevenueForecastController } from "../../controllers/financialForecasts/revenueForecast";

const revenueForecastRoute = Router();

revenueForecastRoute.get('/:financial_forecast_id', getRevenueForecastController  )
revenueForecastRoute.post('/:financial_forecast_id', createRevenueForecastController )
revenueForecastRoute.patch('/:best_case_scenario_id', updateRevenueForecastController  )
revenueForecastRoute.delete('/:best_case_scenario_id',    deleteRevenueForecastController )


export default revenueForecastRoute;


