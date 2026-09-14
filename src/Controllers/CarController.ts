import { Request, Response, NextFunction } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';
import { IVehicleFilterQuery } from '../utils/filterHelpers';

export default class CarController {
  private service: CarService;

  constructor(service: CarService = new CarService()) {
    this.service = service;
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const car: ICar = req.body;

    try {
      const newCar = await this.service.create(car);
      return res.status(201).json(newCar);
    } catch (e) {
      next(e);
    }
  }

  public async getAllCars(req: Request, res: Response, next: NextFunction) {
    try {
      if (Object.keys(req.query).length > 0) {
        const paginated = await this.service.getFilteredCars(
          req.query as unknown as IVehicleFilterQuery,
        );
        return res.status(200).json(paginated);
      }
      const allCars = await this.service.getAllCars();
      return res.status(200).json(allCars);
    } catch (e) {
      next(e);
    }
  }

  public async getCarById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const car = await this.service.getCarById(id);
      return res.status(200).json(car);
    } catch (e) {
      next(e);
    }
  }

  public async updateCar(req: Request, res: Response, next: NextFunction) {
    try {
      const input = req.body;
      const { id } = req.params;
      const updatedCar = await this.service.updateCar(id, input);
      return res.status(200).json(updatedCar);
    } catch (e) {
      next(e);
    }
  }

  public async deleteCar(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.service.deleteCar(id);
      return res.status(204).json({});
    } catch (e) {
      next(e);
    }
  }
}