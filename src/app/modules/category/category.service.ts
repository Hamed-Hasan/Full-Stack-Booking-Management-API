import { calculatePagination } from '../../../helpers/paginationHelper';
import prisma from '../../../shared/prisma';
import { IOptions } from '../services/service.constant';
import { ICategory } from './category.interface';
import {
  CategoryFilterableFields,
  CategorySearchableFields,
} from './category.constant';

const createCategory = async (payload: ICategory) => {
  return await prisma.serviceCategory.create({ data: payload });
};

const createMultipleCategories = async (
  categories: Array<{ name: string }>
) => {
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

const listCategories = async (options: IOptions, filters: any) => {
  const { page, limit, sortBy, sortOrder } = calculatePagination(options);

  // Define skip and take for pagination
  const skip = (page - 1) * limit;
  const take = limit;

  // Build the WHERE condition for filtering and searching
  const andConditions = [];

  // Handling search
  if (filters.searchTerm) {
    andConditions.push({
      OR: CategorySearchableFields.map(field => ({
        [field]: { contains: filters.searchTerm, mode: 'insensitive' },
      })),
    });
  }

  // Handling filtering
  CategoryFilterableFields.forEach(field => {
    if (filters[field]) {
      andConditions.push({ [field]: { equals: filters[field] } });
    }
  });

  const whereConditions =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // Execute the query with pagination, sorting, and filtering
  const categories = await prisma.serviceCategory.findMany({
    where: whereConditions,
    skip,
    take,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.serviceCategory.count({ where: whereConditions });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: categories,
  };
};

export const CategoryService = {
  createCategory,
  createMultipleCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  listCategories,
};
