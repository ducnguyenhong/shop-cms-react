export interface News {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  content: string;
  createdAt: number;
  updatedAt?: number;
}
