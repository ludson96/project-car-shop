import Vehicle from './Vehicle';
import IMotorcycles from '../Interfaces/IMotorcycle';

export default class Motorcycles extends Vehicle {
  private category: string;
  private engineCapacity: number;

  constructor(moto: IMotorcycles) {
    super(moto);
    this.category = moto.category;
    this.engineCapacity = moto.engineCapacity;
  }

  public setCategory(moto: IMotorcycles) {
    this.category = moto.category;
  }

  public getCategory() {
    return this.category;
  }

  public setEngineCapacity(moto: IMotorcycles) {
    this.engineCapacity = moto.engineCapacity;
  }

  public getEngineCapacity() {
    return this.engineCapacity;
  }
}