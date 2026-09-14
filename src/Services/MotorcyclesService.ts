import { isValidObjectId } from 'mongoose';
import Motorcycles from '../Domains/Motorcycle';
import MotorcyclesODM from '../Models/MotorcyclesODM';
import StatusError from '../utils/StatusError';
import IMotorcycles from '../Interfaces/IMotorcycle';
import { IVehicleFilterQuery, buildVehicleFilter, buildSort } from '../utils/filterHelpers';

const INVALID_ID = 'Invalid mongo id';
const NOT_FOUND = 'Motorcycle not found';

export default class MotorcyclesService {
  private motoODM: MotorcyclesODM;

  constructor(motoODM: MotorcyclesODM = new MotorcyclesODM()) {
    this.motoODM = motoODM;
  }

  private createMotorcycleDomain(moto: IMotorcycles) {
    if (moto) return new Motorcycles(moto);
    return null;
  }

  public async create(moto: IMotorcycles): Promise<Motorcycles | null> {
    const newMoto = await this.motoODM.create(moto);
    return this.createMotorcycleDomain(newMoto);
  }

  public async getAllMoto(): Promise<(Motorcycles | null)[]> {
    const allMoto = await this.motoODM.getAll();
    return allMoto.map((moto) => this.createMotorcycleDomain(moto));
  }

  public async getFilteredMoto(query: IVehicleFilterQuery) {
    const filter = buildVehicleFilter(query);
    const sort = buildSort(query.sortBy, query.order);
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const result = await this.motoODM.getPaginated(filter, page, limit, sort);
    return {
      ...result,
      data: result.data.map((moto) => this.createMotorcycleDomain(moto)),
    };
  }

  public async getMotoById(_id: string): Promise<Motorcycles | null> {
    if (!isValidObjectId(_id)) throw new StatusError(422, INVALID_ID);
    const moto = await this.motoODM.getById(_id);
    if (!moto) throw new StatusError(404, NOT_FOUND);
    return this.createMotorcycleDomain(moto);
  }

  public async updateMoto(_id: string, input: IMotorcycles) {
    if (!isValidObjectId(_id)) throw new StatusError(422, INVALID_ID);
    const updatedMoto = await this.motoODM.update(_id, input);
    if (!updatedMoto) throw new StatusError(404, NOT_FOUND);
    return this.createMotorcycleDomain(updatedMoto);
  }

  public async deleteMoto(_id: string): Promise<IMotorcycles> {
    if (!isValidObjectId(_id)) throw new StatusError(422, INVALID_ID);
    const result = await this.motoODM.delete(_id);
    if (!result) throw new StatusError(404, NOT_FOUND);
    return result;
  }
}