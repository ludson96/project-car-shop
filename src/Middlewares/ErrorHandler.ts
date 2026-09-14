import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import StatusError from '../utils/StatusError';

class ErrorHandler {
  public static execute(err: Error, req: Request, res: Response, _next: NextFunction) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: err.errors.map((e) => ({
          path: e.path.join('.'),
          message: e.message,
        })),
      });
    }

    let status = 500;
    let message = 'Internal Server Error';

    if (err instanceof StatusError) {
      status = err.status;
      message = err.message;
    }

    return res.status(status).json({ message });
  }
}

export default ErrorHandler;
