import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { ServiceRoutes } from '../modules/services/service.routes';


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
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
