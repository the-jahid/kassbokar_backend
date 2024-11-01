import { Router } from "express";

import { createExecutiveSummarycontroller, deleteExecutiveSummarycontroller, getExecutiveSummarycontroller, updateExecutiveSummarycontroller } from "../../controllers/buisnessPlan/executiveSummary";

const executiveSummaryRoute = Router();

executiveSummaryRoute.get('/:buisness_plan_id', getExecutiveSummarycontroller )
executiveSummaryRoute.post('/:buisness_plan_id', createExecutiveSummarycontroller)
executiveSummaryRoute.patch('/:executive_summary_id', updateExecutiveSummarycontroller  )
executiveSummaryRoute.delete('/:executive_summary_id', deleteExecutiveSummarycontroller )

export default executiveSummaryRoute;


