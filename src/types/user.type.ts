export type UserRole = 'ROLE_SUPER_ADMIN ' | 'ROLE_ADMIN' | 'ROLE_USER';

export interface User {
  id: string;
  fullName: string;
  phone: string;
  active: boolean;
  address: string | null;
  authorities: { id: number; role: UserRole }[];
  avaUrl: string | null;
  createdBy: string | null;
  createdDate: number | null;
  email: string | null;
  lastModifiedDate: number | null;
  provider: string | null;
  ratingValue: number | null;
}
