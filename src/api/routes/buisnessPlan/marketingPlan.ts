import { Router } from "express";
import { createMarketingPlancontroller, deleteMarketingPlancontroller, getMarketingPlancontroller, updateMarketingPlancontroller } from "../../controllers/buisnessPlan/marketingPlan";

const marketingPlanRoute = Router();

marketingPlanRoute.get('/:buisness_plan', getMarketingPlancontroller )
marketingPlanRoute.post('/:buisness_plan', createMarketingPlancontroller)
marketingPlanRoute.patch('/:marketing_plan_id', updateMarketingPlancontroller)
marketingPlanRoute.delete('/:marketing_plan_id',  deleteMarketingPlancontroller)

export default marketingPlanRoute;



