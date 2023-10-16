// availability.service.ts
import { Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IAvailability } from './availability.interface';

const createAvailability = async (payload: IAvailability) => {
    // Convert date strings to Date objects
    const startDate = new Date(payload.startDate);
    const endDate = new Date(payload.endDate);
  
    return await prisma.availability.create({
      data: {
        ...payload,
        startDate,
        endDate,
      },
    });
  };
  

  const getAvailability = async (id: string) => {
    const response = await prisma.availability.findUnique({
      where: { id },
      include: { service: true },
    });
    return response;
  };
  

const updateAvailability = async (id: string, payload: Partial<IAvailability>) => {

    try {
      const startDate = payload.startDate ? new Date(payload.startDate) : undefined;
      const endDate = payload.endDate ? new Date(payload.endDate) : undefined;
  
      return await prisma.availability.update({
        where: { id },
        data: {
          ...payload,
          startDate,
          endDate,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new Error(`Record with id ${id} not found`);
      }
      throw error;
    }
  };
  

const deleteAvailability = async (id: string) => {
  return await prisma.availability.delete({ where: { id } });
};

const listAvailabilities = async () => {
  return await prisma.availability.findMany({ include: { service: true } });
};

export const AvailabilityService = {
  createAvailability,
  getAvailability,
  updateAvailability,
  deleteAvailability,
  listAvailabilities,
};
