import { Router } from "express";
import { createExpenseAssumptionController,  deleteExpenseAssumptionController,  getExpenseAssumptionController, updateExpenseAssumptionController, } from "../../controllers/financialForecasts/expenseAssumption";

const expenseaAssumptionRoute = Router();

expenseaAssumptionRoute.get('/:financial_forecast_id', getExpenseAssumptionController );
expenseaAssumptionRoute.post('/:financial_forecast_id', createExpenseAssumptionController );
expenseaAssumptionRoute.patch('/:financial_forecast_id',  updateExpenseAssumptionController);
expenseaAssumptionRoute.delete('/:financial_forecast_id',  deleteExpenseAssumptionController);

export default expenseaAssumptionRoute;



