import prisma from '../../../shared/prisma';
import { ICartItem } from './cart.interface';

const addCartItem = async (payload: ICartItem) => {
  return await prisma.cartItem.create({ 
    data: payload,
    include: {
      user: true,
      service: true
    }
  });
};

const updateCartItem = async (id: string, payload: Partial<ICartItem>) => {
  return await prisma.cartItem.update({ 
    where: { id }, 
    data: payload,
    include: {
      user: true,
      service: true
    }
  });
};

const removeCartItem = async (id: string) => {
  return await prisma.cartItem.delete({ where: { id } });
};

const listCartItems = async (userId: string) => {
  return await prisma.cartItem.findMany({ 
    where: { userId },
    include: {
      user: true,
      service: true
    }
  });
};

const getCartItem = async (id: string) => {
    return await prisma.cartItem.findUnique({
      where: { id },
      include: {
        user: true,
        service: true
      },
    });
  };

export const CartItemService = {
  addCartItem,
  updateCartItem,
  removeCartItem,
  listCartItems,
  getCartItem
};
