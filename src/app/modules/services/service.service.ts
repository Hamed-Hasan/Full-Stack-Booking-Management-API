import {  IService } from './service.interface';
import { Prisma, Service } from '@prisma/client';
import prisma from '../../../shared/prisma';


const createService = async (serviceData: IService): Promise<IService> => {
    const { images, ...rest } = serviceData;
    
    const imageCreateInputs = images?.map(image => ({
      filePath: image.filePath,
    })) || [];
    
    const service = await prisma.service.create({
      data: {
        ...rest,
        images: {
          create: imageCreateInputs,
        },
      },
      include: {
        images: true, 
        category: true,
      },
    });
    
    return service;
  };
  

const getService = async (serviceId: string): Promise<IService | null> => {
    const service = await prisma.service.findUnique({ where: { id: serviceId } });
    return service;
  };
  
  const updateService = async (
    serviceId: string,
    serviceData: Prisma.ServiceUpdateInput
  ): Promise<Service> => {
    const service = await prisma.service.update({
      where: { id: serviceId },
      data: serviceData,
    });
    return service;
  };
  
  const deleteService = async (serviceId: string): Promise<IService> => {
    const service = await prisma.service.delete({ where: { id: serviceId } });
    return service;
  };
  
  const listServices = async (): Promise<IService[]> => {
    const services = await prisma.service.findMany();
    return services;
  };
  

export const ServiceService = {
  createService,
  getService,
  updateService,
  deleteService,
  listServices,
};
