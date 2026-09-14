import { Response, NextFunction } from 'express';
import SaleService from '../Services/SaleService';
import { AuthRequest } from '../Middlewares/authMiddleware';

export default class SaleController {
  private service: SaleService;

  constructor(service: SaleService = new SaleService()) {
    this.service = service;
  }

  public async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id as string;
      const { vehicleId, vehicleType } = req.body;
      const sale = await this.service.createSale(userId, vehicleId, vehicleType);
      return res.status(201).json(sale);
    } catch (error) {
      next(error);
    }
  }

  public async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const sales = await this.service.getAllSales();
      return res.status(200).json(sales);
    } catch (error) {
      next(error);
    }
  }

  public async getMySales(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id as string;
      const sales = await this.service.getSalesByUser(userId);
      return res.status(200).json(sales);
    } catch (error) {
      next(error);
    }
  }
}
