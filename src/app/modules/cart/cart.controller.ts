import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CartItemService } from './cart.service';

const addCartItem = catchAsync(async (req: Request, res: Response) => {
  const result = await CartItemService.addCartItem(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Item added to cart successfully.',
    data: result,
  });
});

const updateCartItem = catchAsync(async (req: Request, res: Response) => {
  const result = await CartItemService.updateCartItem(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Cart item updated successfully.',
    data: result,
  });
});

const removeCartItem = catchAsync(async (req: Request, res: Response) => {
  await CartItemService.removeCartItem(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Item removed from cart successfully.',
  });
});

const listCartItems = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const { page, limit } = req.query;
  const result = await CartItemService.listCartItems(userId, parseInt(page as string), parseInt(limit as string));
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Cart items listed successfully.',
    data: result,
  });
});


const getCartItem = catchAsync(async (req: Request, res: Response) => {
  const cartItem = await CartItemService.getCartItem(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Cart item retrieved successfully.',
    data: cartItem,
  });
});

export const CartItemController = {
  addCartItem,
  updateCartItem,
  removeCartItem,
  listCartItems,
  getCartItem,
};
