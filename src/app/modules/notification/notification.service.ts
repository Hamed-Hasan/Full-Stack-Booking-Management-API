import prisma from '../../../shared/prisma';
import { INotification } from './notification.interface';

const createNotification = async (payload: INotification) => {
  return await prisma.notification.create({ data: payload });
};

const getUserNotifications = async (userId: string) => {
    return await prisma.notification.findMany({
      where: { userId },
      include: { user: true }
    });
  };


const getNotification = async (id: string) => {
  return await prisma.notification.findUnique({ where: { id }, include: { user: true } });
};

const updateNotification = async (id: string, payload: Partial<INotification>) => {
  return await prisma.notification.update({ where: { id }, data: payload });
};

const deleteNotification = async (id: string) => {
  return await prisma.notification.delete({ where: { id } });
};

const listNotifications = async (userId: string) => {
  return await prisma.notification.findMany({ where: { userId }, include: { user: true } });
};

export const NotificationService = {
  createNotification,
  getUserNotifications,
  getNotification,
  updateNotification,
  deleteNotification,
  listNotifications,
};
