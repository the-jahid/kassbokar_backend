import { Router } from "express";
import { createIndustryOverviewcontroller,  deleteIndustryOverviewController, getIndustryOverviewcontroller, updateIndustryOverviewcontroller } from "../../controllers/buisnessPlan/industryOverview";


const industryOverviewRoute = Router();

industryOverviewRoute.get('/:buisness_plan_id', getIndustryOverviewcontroller )
industryOverviewRoute.post('/:buisness_plan_id', createIndustryOverviewcontroller)
industryOverviewRoute.patch('/:industry_overview_id', updateIndustryOverviewcontroller)
industryOverviewRoute.delete('/:industry_overview_id',  deleteIndustryOverviewController)


export default industryOverviewRoute;

