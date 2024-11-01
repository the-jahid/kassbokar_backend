import { Router } from "express";
import { createCompanyController, deleteCompanyController, getallCompaniesController, getSingleCompanieController, updateCompanyController } from "../controllers/companies";

const companiesRoute = Router();

companiesRoute.get('/getAll', getallCompaniesController)

companiesRoute.post('', createCompanyController)
companiesRoute.get('/:company_id', getSingleCompanieController)
companiesRoute.patch('/:company_id', updateCompanyController )
companiesRoute.delete('/:company_id', deleteCompanyController )


export default companiesRoute;





