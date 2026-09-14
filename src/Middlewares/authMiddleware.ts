import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import StatusError from '../utils/StatusError';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_jwt_car_shop_portfolio_key';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: 'admin' | 'customer';
    email: string;
  };
}

export const authMiddleware = (req: AuthRequest, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new StatusError(401, 'Token not found');
  }

  const [, token] = authHeader.split(' ');
  if (!token) {
    throw new StatusError(401, 'Token not found');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      role: 'admin' | 'customer';
      email: string;
    };
    req.user = decoded;
    return next();
  } catch (error) {
    throw new StatusError(401, 'Invalid or expired token');
  }
};

export const roleMiddleware = (requiredRole: 'admin' | 'customer') => (
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    throw new StatusError(401, 'Authentication required');
  }

  if (requiredRole === 'admin' && req.user.role !== 'admin') {
    throw new StatusError(403, 'Forbidden: Admin access required');
  }

  return next();
};
