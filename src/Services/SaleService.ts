import { isValidObjectId } from 'mongoose';
import SaleODM from '../Models/SaleODM';
import CarODM from '../Models/CarODM';
import MotorcyclesODM from '../Models/MotorcyclesODM';
import { ISale } from '../Interfaces/ISale';
import StatusError from '../utils/StatusError';
import IVehicle from '../Interfaces/IVehicle';

export default class SaleService {
  private saleODM: SaleODM;
  private carODM: CarODM;
  private motoODM: MotorcyclesODM;

  constructor(
    saleODM: SaleODM = new SaleODM(),
    carODM: CarODM = new CarODM(),
    motoODM: MotorcyclesODM = new MotorcyclesODM(),
  ) {
    this.saleODM = saleODM;
    this.carODM = carODM;
    this.motoODM = motoODM;
  }

  private async fetchVehicle(
    vehicleId: string,
    vehicleType: 'car' | 'motorcycle',
  ): Promise<IVehicle> {
    const vehicle = vehicleType === 'car'
      ? await this.carODM.getById(vehicleId)
      : await this.motoODM.getById(vehicleId);

    if (!vehicle) {
      const name = vehicleType === 'car' ? 'Car' : 'Motorcycle';
      throw new StatusError(404, `${name} not found`);
    }
    return vehicle;
  }

  private async markAsUnavailable(
    vehicleId: string,
    vehicleType: 'car' | 'motorcycle',
  ): Promise<void> {
    if (vehicleType === 'car') {
      await this.carODM.update(vehicleId, { status: false });
    } else {
      await this.motoODM.update(vehicleId, { status: false });
    }
  }

  public async createSale(
    userId: string,
    vehicleId: string,
    vehicleType: 'car' | 'motorcycle',
  ): Promise<ISale> {
    if (!isValidObjectId(vehicleId)) {
      throw new StatusError(422, 'Invalid mongo id');
    }

    const vehicle = await this.fetchVehicle(vehicleId, vehicleType);

    if (!vehicle.status) {
      throw new StatusError(400, 'Vehicle is not available for sale');
    }

    const sale = await this.saleODM.create({
      userId,
      vehicleId,
      vehicleType,
      saleValue: vehicle.buyValue,
      status: 'completed',
    });

    await this.markAsUnavailable(vehicleId, vehicleType);
    return sale;
  }

  public async getAllSales(): Promise<ISale[]> {
    return this.saleODM.getAll();
  }

  public async getSalesByUser(userId: string): Promise<ISale[]> {
    return this.saleODM.findByUserId(userId);
  }
}
