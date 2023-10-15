import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { ServiceRoutes } from '../modules/services/service.routes';
import { CartItemRoutes } from '../modules/cart/cart.routes';
import { BookingRoutes } from '../modules/booking/booking.routes';
import { ProfileRoutes } from '../modules/profiles/profile.routes';
import { ReviewRoutes } from '../modules/reviews/review.routes';


const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    routes: AuthRoutes
  },
  {
    path: "/category",
    routes: CategoryRoutes
  },
  {
    path: "/services",
    routes: ServiceRoutes
  },
  {
    path: "/cart",
    routes: CartItemRoutes
  },
  {
    path: "/booking",
    routes: BookingRoutes
  },
  {
    path: "/profiles",
    routes: ProfileRoutes
  },
  {
    path: "/reviews",
    routes: ReviewRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
