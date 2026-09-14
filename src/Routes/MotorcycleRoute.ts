import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';
import {
  validateBody,
  motorcycleSchema,
  updateMotorcycleSchema,
} from '../Validations/vehicleValidation';
import { authMiddleware, roleMiddleware } from '../Middlewares/authMiddleware';

const router = Router();
const motorcycleController = new MotorcycleController();

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin'),
  validateBody(motorcycleSchema),
  (req, res, next) => motorcycleController.create(req, res, next),
);
router.get('/', (req, res, next) => motorcycleController.getAllMoto(req, res, next));
router.get('/:id', (req, res, next) => motorcycleController.getMotoById(req, res, next));
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  validateBody(updateMotorcycleSchema),
  (req, res, next) => motorcycleController.updateMoto(req, res, next),
);
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  (req, res, next) => motorcycleController.deleteMoto(req, res, next),
);

export default router;