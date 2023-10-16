import prisma from '../../../shared/prisma';
import {  UserRole } from './user.interface';


export type UserUpdateInput = {
    email?: string;
    password?: string;
    role?: UserRole; 
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
        return await prisma.user.update({
            where: { id },
            data,
        });
    },

    async deleteUser(id: string) {
        return await prisma.user.delete({ where: { id } });
    },
};
