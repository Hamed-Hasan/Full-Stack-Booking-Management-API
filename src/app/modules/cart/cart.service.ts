import { Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { ICartItem } from './cart.interface';

const addCartItem = async (payload: ICartItem) => {
  return await prisma.cartItem.create({
    data: payload,
    include: {
      user: true,
      service: true,
    },
  });
};

const updateCartItem = async (id: string, payload: Partial<ICartItem>) => {
  return await prisma.cartItem.update({
    where: { id },
    data: payload,
    include: {
      user: true,
      service: true,
    },
  });
};

const removeCartItem = async (id: string) => {
  return await prisma.cartItem.delete({ where: { id } });
};

const listCartItems = async (userId: string, page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const whereConditions: Prisma.CartItemWhereInput = {
    userId: userId,
  };

  const total = await prisma.cartItem.count({ where: whereConditions });
  const cartItems = await prisma.cartItem.findMany({
    where: whereConditions,
    include: {
      user: true,
      service: true,
    },
    skip,
    take: limit,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: cartItems,
  };
};

const getCartItem = async (id: string) => {
  return await prisma.cartItem.findUnique({
    where: { id },
    include: {
      user: true,
      service: true,
    },
  });
};

export const CartItemService = {
  addCartItem,
  updateCartItem,
  removeCartItem,
  listCartItems,
  getCartItem,
};
