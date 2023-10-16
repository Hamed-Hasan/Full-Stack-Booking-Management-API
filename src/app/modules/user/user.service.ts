import { Prisma, User as PrismaUser } from '@prisma/client';

import prisma from '../../../shared/prisma';
import {  UserRole } from './user.interface';

export type User = PrismaUser;
export type UserUpdateInput = {
    email?: string;
    password?: string;
    role?: UserRole; 
    profile?: Prisma.ProfileUpdateInput;
};
export const UserService = {
    async getAllUsers() {
        return await prisma.user.findMany({
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

    async updateUser(id: string, data: UserUpdateInput, profileImage?: string): Promise<User> {
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
        }
        else {
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
