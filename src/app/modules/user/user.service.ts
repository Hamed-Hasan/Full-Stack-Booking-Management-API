import { Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
import {  UserRole } from './user.interface';


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

    async updateUser(id: string, data: UserUpdateInput) {
        // First, try to find an existing Profile record for the User.
        const existingProfile = await prisma.profile.findUnique({
            where: { userId: id },
        });
    
        // If a Profile record exists, perform a nested update.
        if (existingProfile) {
            return await prisma.user.update({
                where: { id },
                data: {
                    ...data,
                    profile: {
                        update: data.profile,
                    },
                },
                include: { profile: true },
            });
        }
        // If no Profile record exists, create a new Profile record.
        else {
            return await prisma.user.update({
                where: { id },
                data: {
                    ...data,
                    profile: {
                        create: data.profile,
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
