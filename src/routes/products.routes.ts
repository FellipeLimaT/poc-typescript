import { Router } from 'express';
import { productsController } from '../controllers/products.controller.js';
import { authValidation } from '../middlewares/authValidation.middleware.js';
import { schemaValidation } from '../middlewares/schemaValidation.middleware.js';
import { productSchema } from '../schemas/products.schemas.js';

export const productsRoutes = Router();

productsRoutes.use(authValidation);

productsRoutes.post('/product', schemaValidation(productSchema), productsController.createProduct);
productsRoutes.get('/products', productsController.getProducts);
productsRoutes.put('/product/:id', schemaValidation(productSchema), productsController.updateProduct);
productsRoutes.delete('/product/:id', schemaValidation(productSchema), productsController.deleteProduct);