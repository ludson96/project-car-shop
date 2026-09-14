import { Request, Response, NextFunction } from 'express';
import IMotorcycles from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcyclesService';
import { IVehicleFilterQuery } from '../utils/filterHelpers';

export default class MotorcycleController {
  private service: MotorcycleService;

  constructor(service: MotorcycleService = new MotorcycleService()) {
    this.service = service;
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const moto: IMotorcycles = req.body;
      const newMoto = await this.service.create(moto);
      return res.status(201).json(newMoto);
    } catch (e) {
      next(e);
    }
  }

  public async getAllMoto(req: Request, res: Response, next: NextFunction) {
    try {
      if (Object.keys(req.query).length > 0) {
        const paginated = await this.service.getFilteredMoto(
          req.query as unknown as IVehicleFilterQuery,
        );
        return res.status(200).json(paginated);
      }
      const allMoto = await this.service.getAllMoto();
      return res.status(200).json(allMoto);
    } catch (e) {
      next(e);
    }
  }

  public async getMotoById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const moto = await this.service.getMotoById(id);
      return res.status(200).json(moto);
    } catch (e) {
      next(e);
    }
  }

  public async updateMoto(req: Request, res: Response, next: NextFunction) {
    try {
      const input = req.body;
      const { id } = req.params;
      const updatedMoto = await this.service.updateMoto(id, input);
      return res.status(200).json(updatedMoto);
    } catch (e) {
      next(e);
    }
  }

  public async deleteMoto(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.service.deleteMoto(id);
      return res.status(204).json({});
    } catch (e) {
      next(e);
    }
  }
}