import { Router } from "express";
import { createUseofFundsController, deleteUseofFundsController, getUseofFundsController, updateUseofFundsController } from "../../controllers/financialForecasts/useofFunds";

const useofFundsRoute = Router();

useofFundsRoute.get('/:financial_forecast_id', getUseofFundsController )
useofFundsRoute.post('/:financial_forecast_id', createUseofFundsController )
useofFundsRoute.patch('/:useof_fund_id', updateUseofFundsController )
useofFundsRoute.delete('/:useof_fund_id', deleteUseofFundsController  )


export default useofFundsRoute;


