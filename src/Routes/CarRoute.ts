import { Router } from 'express';
import CarController from '../Controllers/CarController';
import { validateBody, carSchema, updateCarSchema } from '../Validations/vehicleValidation';
import { authMiddleware, roleMiddleware } from '../Middlewares/authMiddleware';

const router = Router();
const carController = new CarController();

router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin'),
  validateBody(carSchema),
  (req, res, next) => carController.create(req, res, next),
);
router.get('/', (req, res, next) => carController.getAllCars(req, res, next));
router.get('/:id', (req, res, next) => carController.getCarById(req, res, next));
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  validateBody(updateCarSchema),
  (req, res, next) => carController.updateCar(req, res, next),
);
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('admin'),
  (req, res, next) => carController.deleteCar(req, res, next),
);

export default router;