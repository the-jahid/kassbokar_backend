import { Router } from "express";
import { createExpertiseController, deletExpertiseController, getallExpertiseController, updatExpertiseController } from "../controllers/expertise";

const expertiseAuth = Router();

expertiseAuth.post('/create', createExpertiseController  )
expertiseAuth.get('/getall', getallExpertiseController )
expertiseAuth.patch('/:expertise_id', updatExpertiseController )
expertiseAuth.delete('/:expertise_id',  deletExpertiseController)

export default expertiseAuth;



