import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookingService } from './booking.service';

export const BookingController = {
    createBooking: catchAsync(async (req: Request, res: Response) => {
        const result = await BookingService.createBooking(req.body);
        sendResponse(res, { statusCode: 201, success: true, message: 'Booking created successfully.', data: result });
    }),
    getBooking: catchAsync(async (req: Request, res: Response) => {
        const result = await BookingService.getBooking(req.params.id);
        sendResponse(res, { statusCode: 200, success: true, message: 'Booking fetched successfully.', data: result });
    }),
    updateBooking: catchAsync(async (req: Request, res: Response) => {
        const result = await BookingService.updateBooking(req.params.id, req.body);
        sendResponse(res, { statusCode: 200, success: true, message: 'Booking updated successfully.', data: result });
    }),
    deleteBooking: catchAsync(async (req: Request, res: Response) => {
        await BookingService.deleteBooking(req.params.id);
        sendResponse(res, { statusCode: 200, success: true, message: 'Booking deleted successfully.' });
    }),
    listBookings: catchAsync(async (req: Request, res: Response) => {
        const result = await BookingService.listBookings();
        sendResponse(res, { statusCode: 200, success: true, message: 'Bookings listed successfully.', data: result });
    }),

     listUserBookings: catchAsync(async (req: Request, res: Response) => {
        const result = await BookingService.listUserBookings(req.params.userId);
        sendResponse(res, { statusCode: 200, success: true, message: 'User bookings listed successfully.', data: result });
      })
};
