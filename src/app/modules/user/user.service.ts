import { Prisma, User as PrismaUser } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { UserRole } from './user.interface';
import { UserFilterableFields, UserSearchableFields } from './user.constant';
import { calculatePagination } from '../../../helpers/paginationHelper';

export type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

export type User = PrismaUser;
export type UserUpdateInput = {
  email?: string;
  password?: string;
  role?: UserRole;
  profile?: Prisma.ProfileUpdateInput;
};

export const UserService = {
  listAllUsers: async (options: IOptions, filters: any) => {
    const { page, limit, sortBy, sortOrder } = calculatePagination(options);

    // Define skip and take for pagination
    const skip = (page - 1) * limit;
    const take = limit;

    // Build the WHERE condition for filtering and searching
    const andConditions = [];

    // Handling search
    if (filters.searchTerm) {
      andConditions.push({
        OR: UserSearchableFields.map(field => ({
          [field]: { contains: filters.searchTerm, mode: 'insensitive' },
        })),
      });
    }

    // Handling filtering
    UserFilterableFields.forEach(field => {
      if (filters[field]) {
        andConditions.push({ [field]: { equals: filters[field] } });
      }
    });

    const whereConditions =
      andConditions.length > 0 ? { AND: andConditions } : {};

    // Execute the query with pagination, sorting, and filtering
    const users = await prisma.user.findMany({
      include: {
        profile: true,
      },
      where: whereConditions,
      skip,
      take,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });

    const total = await prisma.user.count({ where: whereConditions });

    if (users.length === 0) {
      // Handle case when no results are found
      return {
        meta: {
          total: 0,
          page,
          limit,
        },
        data: [],
      };
    }

    return {
      meta: {
        total,
        page,
        limit,
      },
      data: users,
    };
  },

  async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        bookings: true,
        reviews: true,
        cartItems: true,
        blogPosts: true,
        feedbacks: true,
        notifications: true,
        profile: true,
      },
    });
  },

  async updateUser(
    id: string,
    data: UserUpdateInput,
    profileImage?: string
  ): Promise<User> {
    const existingProfile = await prisma.profile.findUnique({
      where: { userId: id },
    });

    const profileData: Prisma.ProfileCreateInput | Prisma.ProfileUpdateInput = {
      ...data.profile,
      profileImage: profileImage || undefined,
    };

    if (existingProfile) {
      return await prisma.user.update({
        where: { id },
        data: {
          ...data,
          profile: {
            update: profileData,
          },
        },
        include: { profile: true },
      });
    } else {
      return await prisma.user.update({
        where: { id },
        data: {
          ...data,
          profile: {
            create: profileData,
          },
        },
        include: { profile: true },
      });
    }
  },

  async deleteUser(id: string) {
    return await prisma.user.delete({ where: { id } });
  },
};
