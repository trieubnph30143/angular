export type Category = {
  _id: string;
  name: string;
  description?: string;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
};
export type typeCategoryValue = Omit<Category, '_id'>;
export type typeResponseCategory = {
  status: number;
  message: string;
  data: Category;
};
