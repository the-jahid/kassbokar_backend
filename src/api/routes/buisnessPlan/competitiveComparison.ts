import { Router } from "express";
import { createCompetitiveComparisoncontroller, deleteCompetitiveComparisoncontroller, getCompetitiveComparisoncontroller, updateCompetitiveComparisoncontroller } from "../../controllers/buisnessPlan/competitiveComparison";





const competitiveComparisonRoute = Router();

competitiveComparisonRoute.get('/:buisness_plan_id', getCompetitiveComparisoncontroller )
competitiveComparisonRoute.post('/:buisness_plan_id', createCompetitiveComparisoncontroller )
competitiveComparisonRoute.patch('/:competitive_comparison_id',  updateCompetitiveComparisoncontroller )
competitiveComparisonRoute.delete('/:competitive_comparison_id', deleteCompetitiveComparisoncontroller )


export default competitiveComparisonRoute;
