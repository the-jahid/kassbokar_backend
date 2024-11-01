import prisma from "../../config/db";
import error from "../../utils/error";

// Create ExpertiseBooking
export const createExpertiseBookingService = async (booked_by_user_id: string, booked_by_user_name: string, expertise_id: string, expertise_name: string) => {

    const newBooking = await prisma.expertiseBooking.create({
        data: {
            bookedbyUserId: booked_by_user_id,
            bookedbyUserName: booked_by_user_name,
            expertiseId: expertise_id,
            expertiseName: expertise_name,
        },
    });

    if (!newBooking) {
        throw error('Failed to create expertise booking', 400);
    }

    return newBooking;
};

// Get All ExpertiseBookings
export const getAllExpertiseBookingsService = async () => {
    const bookings = await prisma.expertiseBooking.findMany();

    if (bookings.length == 0) {
        throw error('No expertise bookings found', 404);
    }
    
    return bookings;
};

// Update ExpertiseBooking
export const updateExpertiseBookingService = async (expertise_booking_id: string, booked_by_user_id: string, booked_by_user_name: string, expertise_id: string, expertise_name: string) => {
    let booking = await prisma.expertiseBooking.findUnique({
        where: { 
            id: expertise_booking_id
         },
    });

    if (!booking) {
        throw error('No expertise booking found with the given ID', 404);
    }

    booking = await prisma.expertiseBooking.update({
        where: { id:expertise_booking_id },
        data: {
            bookedbyUserId: booked_by_user_id,
            bookedbyUserName: booked_by_user_name,
            expertiseId: expertise_id,
            expertiseName: expertise_name,
        },
    });

    return booking;
};

// Delete ExpertiseBooking
export const deleteExpertiseBookingService = async (expertise_booking_id: string) => {
    let booking = await prisma.expertiseBooking.findUnique({
        where: { id:expertise_booking_id },
    });

    if (!booking) {
        throw error('No expertise booking found with the given ID', 404);
    }

    booking = await prisma.expertiseBooking.delete({
        where: { id:expertise_booking_id },
    });

    return booking;
};