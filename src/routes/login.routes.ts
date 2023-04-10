import { Router } from 'express';
import { schemaValidation } from '../middlewares/schemaValidation.middleware.js';
import { loginController } from '../controllers/login.controller.js'
import { signUpSchema, signInSchema } from '../schemas/login.schemas.js'

export const loginRoutes = Router();

loginRoutes.post('/signup', schemaValidation(signUpSchema), loginController.signUp);   
loginRoutes.post('/signin', schemaValidation(signInSchema), loginController.signIn);