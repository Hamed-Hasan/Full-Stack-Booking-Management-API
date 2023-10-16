import prisma from '../../../shared/prisma';
import { IFaq } from './faq.interface';

const createFaq = async (payload: IFaq) => {
  return await prisma.fAQ.create({ data: payload });
};

const getFaq = async (id: string) => {
  return await prisma.fAQ.findUnique({ where: { id } });
};

const updateFaq = async (id: string, payload: Partial<IFaq>) => {
  return await prisma.fAQ.update({ where: { id }, data: payload });
};

const deleteFaq = async (id: string) => {
  return await prisma.fAQ.delete({ where: { id } });
};

const listFaqs = async () => {
  return await prisma.fAQ.findMany();
};

export const FaqService = {
  createFaq,
  getFaq,
  updateFaq,
  deleteFaq,
  listFaqs,
};
