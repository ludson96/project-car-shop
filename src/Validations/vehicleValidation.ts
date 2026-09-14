import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

const currentYear = new Date().getFullYear();

export const carSchema = z.object({
  model: z.string().min(2, 'Model must have at least 2 characters'),
  year: z.number().int().min(1900, 'Year must be >= 1900').max(currentYear + 1, 'Invalid year'),
  color: z.string().min(2, 'Color must have at least 2 characters'),
  status: z.boolean().optional().default(false),
  buyValue: z.number().positive('Buy value must be positive'),
  doorsQty: z.number().int().min(2, 'Doors must be between 2 and 5').max(5),
  seatsQty: z.number().int().min(2, 'Seats must be between 2 and 9').max(9),
});

export const updateCarSchema = carSchema.partial();

export const motorcycleSchema = z.object({
  model: z.string().min(2, 'Model must have at least 2 characters'),
  year: z.number().int().min(1900, 'Year must be >= 1900').max(currentYear + 1, 'Invalid year'),
  color: z.string().min(2, 'Color must have at least 2 characters'),
  status: z.boolean().optional().default(false),
  buyValue: z.number().positive('Buy value must be positive'),
  category: z.enum(['Street', 'Custom', 'Trail'], {
    errorMap: () => ({ message: 'Category must be Street, Custom or Trail' }),
  }),
  engineCapacity: z.number().int().min(50, 'Engine >= 50cc').max(2500, 'Engine <= 2500cc'),
});

export const updateMotorcycleSchema = motorcycleSchema.partial();

export const validateBody = (schema: z.ZodTypeAny) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const formattedErrors = result.error.errors.map((err) => ({
      path: err.path.join('.'),
      message: err.message,
    }));
    return res.status(400).json({
      message: 'Validation failed',
      errors: formattedErrors,
    });
  }
  req.body = result.data;
  next();
};
