import { z } from 'zod';

const createSaleSchema = z.object({
  vehicleId: z.string().min(24, 'Invalid vehicle id').max(24, 'Invalid vehicle id'),
  vehicleType: z.enum(['car', 'motorcycle'], {
    errorMap: () => ({ message: 'vehicleType must be either "car" or "motorcycle"' }),
  }),
});

export default createSaleSchema;
