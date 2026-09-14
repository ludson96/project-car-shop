import { Schema } from 'mongoose';
import { IUser } from '../Interfaces/IUser';
import AbstractODM from './AbstractODM';

export default class UserODM extends AbstractODM<IUser> {
  constructor() {
    const schema = new Schema<IUser>({
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
      createdAt: { type: Date, default: Date.now },
    });
    super(schema, 'User');
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    return this.model.findOne({ email });
  }
}
