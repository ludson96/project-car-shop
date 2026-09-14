import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserODM from '../Models/UserODM';
import { IUser, IUserResponse } from '../Interfaces/IUser';
import StatusError from '../utils/StatusError';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_jwt_car_shop_portfolio_key';

export default class UserService {
  private userODM: UserODM;

  constructor(userODM: UserODM = new UserODM()) {
    this.userODM = userODM;
  }

  public async register(userData: IUser): Promise<{ user: IUserResponse; token: string }> {
    const existing = await this.userODM.findByEmail(userData.email);
    if (existing) {
      throw new StatusError(409, 'Email already registered');
    }

    const hashedPassword = await bcrypt.hash(userData.password as string, 10);
    const created = await this.userODM.create({
      ...userData,
      password: hashedPassword,
    });

    const user: IUserResponse = {
      id: created.id as string,
      name: created.name,
      email: created.email,
      role: created.role,
    };

    const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, JWT_SECRET, {
      expiresIn: '24h',
    });

    return { user, token };
  }

  public async login(
    credentials: Pick<IUser, 'email' | 'password'>,
  ): Promise<{ user: IUserResponse; token: string }> {
    const user = await this.userODM.findByEmail(credentials.email);
    if (!user || !user.password) {
      throw new StatusError(401, 'Invalid email or password');
    }

    const isMatch = await bcrypt.compare(credentials.password as string, user.password);
    if (!isMatch) {
      throw new StatusError(401, 'Invalid email or password');
    }

    const userResponse: IUserResponse = {
      id: user.id as string,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(
      { id: userResponse.id, role: userResponse.role, email: userResponse.email },
      JWT_SECRET,
      { expiresIn: '24h' },
    );

    return { user: userResponse, token };
  }
}
