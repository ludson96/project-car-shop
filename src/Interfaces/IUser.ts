export interface IUser {
  id?: string;
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'customer';
  createdAt?: Date;
}

export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}
