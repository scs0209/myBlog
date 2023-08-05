import { client } from 'apis';

export const createCategory = (categoryName: string) => {
  return client.post('/api/categories', { name: categoryName });
};

export const editCategory = (categoryId: number | null, categoryName: string) => {
  return client.put(`/api/categories/${categoryId}`, { name: categoryName });
};

export const toggleCategoryHidden = (categoryId: number, hidden: boolean) => {
  return client.put(`/api/categories/${categoryId}`, { hidden });
};

export const deleteCategory = (categoryId: number) => {
  return client.delete(`/api/categories/${categoryId}`);
};
