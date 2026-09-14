export interface ISale {
  id?: string;
  userId: string;
  vehicleId: string;
  vehicleType: 'car' | 'motorcycle';
  saleValue: number;
  saleDate?: Date;
  status: 'completed' | 'cancelled';
}
