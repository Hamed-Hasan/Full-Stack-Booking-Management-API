import prisma from '../../../shared/prisma';
import { IFeedback } from './feedback.interface';

const createFeedback = async (payload: IFeedback) => {
  return await prisma.feedback.create({
    data: payload,
    include: { user: true },
  });
};

const getFeedback = async (id: string) => {
  return await prisma.feedback.findUnique({
    where: { id },
    include: { user: true },
  });
};

const updateFeedback = async (id: string, payload: Partial<IFeedback>) => {
  return await prisma.feedback.update({
    where: { id },
    data: payload,
    include: { user: true },
  });
};

const deleteFeedback = async (id: string) => {
  return await prisma.feedback.delete({ where: { id } });
};

const listFeedback = async () => {
  return await prisma.feedback.findMany({ include: { user: true } });
};

export const FeedbackService = {
  createFeedback,
  getFeedback,
  updateFeedback,
  deleteFeedback,
  listFeedback,
};
