export interface Category {
  id: string;
  title: string;
  url: string;
  parentId?: string;
  thumbnail?: string;
  createdAt: number;
  updatedAt?: number;
}
