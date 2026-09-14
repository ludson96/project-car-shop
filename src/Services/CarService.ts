import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import StatusError from '../utils/StatusError';
import { IVehicleFilterQuery, buildVehicleFilter, buildSort } from '../utils/filterHelpers';

const INVALID_ID = 'Invalid mongo id';
const NOT_FOUND = 'Car not found';

export default class CarService {
  private carODM: CarODM;

  constructor(carODM: CarODM = new CarODM()) {
    this.carODM = carODM;
  }

  private createCarDomain(car: ICar | null) {
    if (car) return new Car(car);
    return null;
  }

  public async create(car: ICar): Promise<Car | null> {
    const newCar = await this.carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async getAllCars(): Promise<(Car | null)[]> {
    const allCars = await this.carODM.getAll();
    return allCars.map((car) => this.createCarDomain(car));
  }

  public async getFilteredCars(query: IVehicleFilterQuery) {
    const filter = buildVehicleFilter(query);
    const sort = buildSort(query.sortBy, query.order);
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const result = await this.carODM.getPaginated(filter, page, limit, sort);
    return {
      ...result,
      data: result.data.map((car) => this.createCarDomain(car)),
    };
  }

  public async getCarById(_id: string): Promise<Car | null> {
    if (!isValidObjectId(_id)) throw new StatusError(422, INVALID_ID);
    const car = await this.carODM.getById(_id);
    if (!car) throw new StatusError(404, NOT_FOUND);
    return this.createCarDomain(car);
  }

  public async updateCar(_id: string, input: ICar): Promise<Car | null> {
    if (!isValidObjectId(_id)) throw new StatusError(422, INVALID_ID);
    const updatedCar = await this.carODM.update(_id, input);
    if (!updatedCar) throw new StatusError(404, NOT_FOUND);
    return this.createCarDomain(updatedCar);
  }

  public async deleteCar(_id: string): Promise<ICar> {
    if (!isValidObjectId(_id)) throw new StatusError(422, INVALID_ID);
    const result = await this.carODM.delete(_id);
    if (!result) throw new StatusError(404, NOT_FOUND);
    return result;
  }
}