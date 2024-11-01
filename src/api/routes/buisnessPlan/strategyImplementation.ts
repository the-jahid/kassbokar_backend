import { Router } from "express";
import { createStrategyImplementationcontroller, deleteStrategyImplementationcontroller, getStrategyImplementationcontroller, updateStrategyImplementationcontroller } from "../../controllers/buisnessPlan/strategyImplementation";

const strategyImplementationRoute = Router();

strategyImplementationRoute.get('/:buisness_plan_id', getStrategyImplementationcontroller)
strategyImplementationRoute.post('/:buisness_plan_id',createStrategyImplementationcontroller)
strategyImplementationRoute.patch('/:strategy_implementation_id', updateStrategyImplementationcontroller )
strategyImplementationRoute.delete('/:strategy_implementation_id',  deleteStrategyImplementationcontroller)


export default strategyImplementationRoute;


