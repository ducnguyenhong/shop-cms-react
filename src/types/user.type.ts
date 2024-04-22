export interface User {
  id: string;
  username: string;
  fullName: string;
  role: string;
  address: string;
  phone: string;
  createdAt: number;
  updatedAt?: number;
}
