import { Router } from 'express';
import { productsRoutes } from './products.routes.js';
import { loginRoutes } from './login.routes.js';

export const routes = Router();

routes.use([loginRoutes, productsRoutes] );