import { Router } from 'express';
import SaleController from '../Controllers/SaleController';
import { authMiddleware, roleMiddleware, AuthRequest } from '../Middlewares/authMiddleware';
import { validateBody } from '../Validations/vehicleValidation';
import createSaleSchema from '../Validations/saleValidation';

const router = Router();
const saleController = new SaleController();

// Qualquer usuário autenticado pode comprar um veículo
router.post(
  '/',
  authMiddleware,
  validateBody(createSaleSchema),
  (req, res, next) => saleController.create(req as AuthRequest, res, next),
);

// O próprio usuário consulta seu histórico
router.get(
  '/my-sales',
  authMiddleware,
  (req, res, next) => saleController.getMySales(req as AuthRequest, res, next),
);

// Apenas admin pode ver todas as vendas da loja
router.get(
  '/',
  authMiddleware,
  roleMiddleware('admin'),
  (req, res, next) => saleController.getAll(req as AuthRequest, res, next),
);

export default router;
