import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CartItemValidation } from './cart.validation';
import { CartItemController } from './cart.controller';

const router = express.Router();

router.post(
  '/add',
  validateRequest(CartItemValidation.createCartItemZodSchema),
  CartItemController.addCartItem
);

router.put(
  '/:id',
  validateRequest(CartItemValidation.updateCartItemZodSchema),
  CartItemController.updateCartItem
);

router.delete('/:id', CartItemController.removeCartItem);

router.get('/user/:userId', CartItemController.listCartItems);

router.get('/:id', CartItemController.getCartItem);

export const CartItemRoutes = router;
