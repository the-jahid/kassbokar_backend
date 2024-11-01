import { Router } from "express";
import { createCompanyDescriptioncontroller, deleteCompanyDescriptioncontroller, getCompanyDescriptioncontroller, updateCompanyDescriptioncontroller } from "../../controllers/buisnessPlan/compnayDescription";


const companyDescriptionRoute = Router();

companyDescriptionRoute.get('/:buisness_plan_id', getCompanyDescriptioncontroller)
companyDescriptionRoute.post('/:buisness_plan_id', createCompanyDescriptioncontroller )
companyDescriptionRoute.patch('/:company_description_id', updateCompanyDescriptioncontroller  )
companyDescriptionRoute.delete('/:company_description_id', deleteCompanyDescriptioncontroller )


export default companyDescriptionRoute;

