import { Router } from "express";
import { createExpertiseBookingController, deleteExpertiseBookingController, getAllExpertiseBookingsController, updateExpertiseBookingController } from "../controllers/expertiseBooking";

const expertiseBookingAuth = Router();

expertiseBookingAuth.post('/create', createExpertiseBookingController )
expertiseBookingAuth.get('/getall', getAllExpertiseBookingsController )
expertiseBookingAuth.patch('/:expertise_booking_id', updateExpertiseBookingController )
expertiseBookingAuth.delete('/:expertise_booking_id',  deleteExpertiseBookingController)

export default expertiseBookingAuth;
