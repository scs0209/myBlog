import { client } from 'apis';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const useCategories = () =>
  useQuery('categories', async () => {
    const { data } = await client.get('/api/categories');

    return data;
  });

export const useCreateCategory = () => {
  const createCategoryMutation = useMutation((categoryName: string) => {
    return client.post('/api/categories', { name: categoryName });
  });

  return createCategoryMutation;
};

export const useEditCategory = () => {
  const queryClient = useQueryClient();

  const editCategoryMutation = useMutation(
    (params: { categoryId: number | null; categoryName: string }) => {
      const { categoryId, categoryName } = params;

      return client.put(`/api/categories/${categoryId}`, { name: categoryName });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('categories'); // 로그인 성공 시 사용자 쿼리를 무효화합니다.
      },
    },
  );

  return editCategoryMutation;
};

export const useToggleCategoryHidden = () => {
  const queryClient = useQueryClient();

  const toggleCategoryHiddenMutation = useMutation(
    (params: { categoryId: number; hidden: boolean }) => {
      const { categoryId, hidden } = params;

      return client.put(`/api/categories/${categoryId}`, { hidden });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('categories'); // 로그인 성공 시 사용자 쿼리를 무효화합니다.
      },
    },
  );

  return toggleCategoryHiddenMutation;
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const deleteCategoryMutation = useMutation(
    (categoryId: number) => {
      return client.delete(`/api/categories/${categoryId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('categories'); // 로그인 성공 시 사용자 쿼리를 무효화합니다.
      },
    },
  );

  return deleteCategoryMutation;
};
