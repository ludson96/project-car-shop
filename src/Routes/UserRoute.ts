import { Router } from 'express';
import UserController from '../Controllers/UserController';
import { validateBody } from '../Validations/vehicleValidation';
import { registerUserSchema, loginUserSchema } from '../Validations/userValidation';

const router = Router();
const userController = new UserController();

router.post(
  '/register',
  validateBody(registerUserSchema),
  (req, res, next) => userController.register(req, res, next),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  (req, res, next) => userController.login(req, res, next),
);

export default router;
