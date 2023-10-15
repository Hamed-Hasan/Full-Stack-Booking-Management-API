import prisma from '../../../shared/prisma';
import { IBooking } from './booking.interface';

export const BookingService = {
    createBooking: async (payload: IBooking) => {
        return await prisma.booking.create({
            data: payload,
        });
    },
    getBooking: async (id: string) => {
        return await prisma.booking.findUnique({
            where: { id },
            include: {
                user: true,
                service: true,
            },
        });
    },
    updateBooking: async (id: string, payload: Partial<IBooking>) => {
        return await prisma.booking.update({
            where: { id },
            data: payload,
        });
    },
    deleteBooking: async (id: string) => {
        return await prisma.booking.delete({
            where: { id },
        });
    },
    listBookings: async () => {
        return await prisma.booking.findMany({
            include: {
                user: true,
                service: true,
            },
        });
    },
   
    listUserBookings:  async (userId: string) => {
        return await prisma.booking.findMany({
          where: { userId },
          include: {
            user: true,
            service: true,
          },
        });
      }
};
