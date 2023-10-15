import express from 'express';
import { BookingController } from './booking.controller';
import { BookingValidation } from './booking.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
    '/create-booking',
    validateRequest(BookingValidation.bookingZodSchema),
    BookingController.createBooking
);

router.get('/:id', BookingController.getBooking);

router.put(
    '/:id',
    validateRequest(BookingValidation.updateBookingZodSchema),
    BookingController.updateBooking
);

router.delete('/:id', BookingController.deleteBooking);

router.get('/', BookingController.listBookings);

router.get(
    '/booked-user/:userId',
    BookingController.listUserBookings
  );

export const BookingRoutes = router;
