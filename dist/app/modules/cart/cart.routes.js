"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const cart_validation_1 = require("./cart.validation");
const cart_controller_1 = require("./cart.controller");
const router = express_1.default.Router();
router.post('/add', (0, validateRequest_1.default)(cart_validation_1.CartItemValidation.createCartItemZodSchema), cart_controller_1.CartItemController.addCartItem);
router.put('/:id', (0, validateRequest_1.default)(cart_validation_1.CartItemValidation.updateCartItemZodSchema), cart_controller_1.CartItemController.updateCartItem);
router.delete('/:id', cart_controller_1.CartItemController.removeCartItem);
router.get('/user/:userId', cart_controller_1.CartItemController.listCartItems);
router.get('/:id', cart_controller_1.CartItemController.getCartItem);
exports.CartItemRoutes = router;
