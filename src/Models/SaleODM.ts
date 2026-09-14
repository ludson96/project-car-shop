import { Schema } from 'mongoose';
import { ISale } from '../Interfaces/ISale';
import AbstractODM from './AbstractODM';

export default class SaleODM extends AbstractODM<ISale> {
  constructor() {
    const schema = new Schema<ISale>({
      userId: { type: String, ref: 'User', required: true },
      vehicleId: { type: String, required: true },
      vehicleType: { type: String, enum: ['car', 'motorcycle'], required: true },
      saleValue: { type: Number, required: true },
      saleDate: { type: Date, default: Date.now },
      status: { type: String, enum: ['completed', 'cancelled'], default: 'completed' },
    });
    super(schema, 'Sale');
  }

  public async findByUserId(userId: string): Promise<ISale[]> {
    return this.model.find({ userId });
  }
}
