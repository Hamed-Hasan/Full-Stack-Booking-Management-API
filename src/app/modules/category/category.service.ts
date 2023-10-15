
import prisma from '../../../shared/prisma';
import { ICategory } from './category.interface';



const createCategory = async (payload: ICategory) => {
  return await prisma.serviceCategory.create({ data: payload });
};

const createMultipleCategories = async (categories: Array<{ name: string }>) => {
    const result = await prisma.serviceCategory.createMany({
      data: categories,
    });
    return result;
  };

const getCategory = async (id: string) => {
  return await prisma.serviceCategory.findUnique({ where: { id } });
};

const updateCategory = async (id: string, payload: ICategory) => {
  return await prisma.serviceCategory.update({ where: { id }, data: payload });
};

const deleteCategory = async (id: string) => {
  return await prisma.serviceCategory.delete({ where: { id } });
};

const listCategories = async () => {
  return await prisma.serviceCategory.findMany();
};

export const CategoryService = {
  createCategory,
  createMultipleCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  listCategories,
};
