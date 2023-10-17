import { calculatePagination } from '../../../helpers/paginationHelper';
import prisma from '../../../shared/prisma';
import { IOptions } from '../services/service.constant';
import { IBooking } from './booking.interface';
import { BookingSearchableFields } from './constant';

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

  listBookings: async (options: IOptions, filters: any) => {
    const { page, limit, sortBy, sortOrder } = calculatePagination(options);
    const skip = (page - 1) * limit;
    const take = limit;

    const andConditions = [];

    // Handling search
    if (filters.searchTerm) {
      andConditions.push({
        OR: BookingSearchableFields.map(field => ({
          [field]: { contains: filters.searchTerm, mode: 'insensitive' },
        })),
      });
    }

    // Handling filtering
    BookingSearchableFields.forEach(field => {
      if (filters[field]) {
        andConditions.push({ [field]: { equals: filters[field] } });
      }
    });

    const whereConditions =
      andConditions.length > 0 ? { AND: andConditions } : {};

    const bookings = await prisma.booking.findMany({
      where: whereConditions,
      skip,
      take,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        user: true,
        service: true,
      },
    });

    const total = await prisma.booking.count({ where: whereConditions });

    return {
      meta: {
        total,
        page,
        limit,
      },
      data: bookings,
    };
  },

  listUserBookings: async (userId: string) => {
    return await prisma.booking.findMany({
      where: { userId },
      include: {
        user: true,
        service: true,
      },
    });
  },
};
