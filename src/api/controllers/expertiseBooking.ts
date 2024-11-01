import { Request, Response, NextFunction } from 'express';
import {
    createExpertiseBookingService,
    deleteExpertiseBookingService,
    getAllExpertiseBookingsService,
    updateExpertiseBookingService,
} from '../services/expertiseBooking';
import error from '../../utils/error';
import checkRequiredFields from '../../utils/helpers/checkRequiredFields';

export interface AuthenticatedRequest extends Request {
    user?: any;
}

export const getAllExpertiseBookingsController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const bookings = await getAllExpertiseBookingsService();
        return res.status(200).json({ message: 'Successfully fetched the list of expertise bookings', bookings });
    } catch (error) {
        next(error);
    }
};

export const createExpertiseBookingController = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> => {
    const { booked_by_user_id, booked_by_user_name, expertise_id, expertise_name } = req.body;

    checkRequiredFields({ booked_by_user_id, booked_by_user_name, expertise_id, expertise_name }, res);
    
    try {
        const booking = await createExpertiseBookingService(booked_by_user_id, booked_by_user_name, expertise_id, expertise_name);
        return res.status(201).json({ message: 'Expertise booking created successfully', booking });
    } catch (error) {
        next(error);
    }
};

export const updateExpertiseBookingController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { booked_by_user_id, booked_by_user_name, expertise_id, expertise_name } = req?.body;
    let { expertise_booking_id } = req.params;
    
    if(expertise_booking_id){
        expertise_booking_id = expertise_booking_id.replace(':', '')
    }

    checkRequiredFields({ booked_by_user_id, booked_by_user_name, expertise_id, expertise_name, expertise_booking_id }, res);

    try {
        const booking = await updateExpertiseBookingService(expertise_booking_id, booked_by_user_id, booked_by_user_name, expertise_id, expertise_name);
        return res.status(200).json({ message: 'Expertise booking updated successfully', booking });
    } catch (error) {
        next(error);
    }
};

export const deleteExpertiseBookingController = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let { expertise_booking_id } = req?.params;
    
    if(expertise_booking_id){
        expertise_booking_id = expertise_booking_id.replace(':', '')
    }

    checkRequiredFields({ expertise_booking_id }, res);

    try {
        await deleteExpertiseBookingService(expertise_booking_id);
        return res.status(200).json({ message: 'Expertise booking deleted successfully', });
    } catch (error) {
        next(error);
    }
};


