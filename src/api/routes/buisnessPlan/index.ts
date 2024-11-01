import { Router } from "express";
import { createBuisnessplanController, deleteBuisnessPlanController, getBuisnessPlanController } from "../../controllers/buisnessPlan";

const buisnessPlanRoute = Router();

buisnessPlanRoute.get('/:company_id', getBuisnessPlanController)
buisnessPlanRoute.post('/:company_id', createBuisnessplanController)
buisnessPlanRoute.patch('/:buisness_plan_id',  )
buisnessPlanRoute.delete('/:buisness_plan_id', deleteBuisnessPlanController)


export default buisnessPlanRoute;


