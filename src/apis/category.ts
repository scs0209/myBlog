import { client } from 'apis';
import { TOAST_MESSAGE } from 'constants/toastMessage';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

export const useCategories = () =>
  useQuery('categories', async () => {
    const { data } = await client.get('/api/categories');

    return data;
  });

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const createCategoryMutation = useMutation(
    (categoryName: string) => {
      return client.post('/api/categories', { name: categoryName });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('categories');
        toast.success(TOAST_MESSAGE.CREATE_CATEGORY_SUCCESS);
      },
      onError: (error: any) => {
        toast.error(`${error.message}`);
      },
    },
  );

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
        toast.success(TOAST_MESSAGE.UPDATE_CATEGORY_SUCCESS);
      },
      onError: (error: any) => {
        toast.error(`${error.message}`);
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
        queryClient.invalidateQueries('categories');
        toast.success(TOAST_MESSAGE.HIDDEN_CATEGORY_SUCCESS);
      },
      onError: (error: any) => {
        toast.error(`${error.message}`);
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
        queryClient.invalidateQueries('categories');
        toast.success(TOAST_MESSAGE.DELETE_CATEGORY_SUCCESS);
      },
      onError: (error: any) => {
        toast.error(`${error.message}`);
      },
    },
  );

  return deleteCategoryMutation;
};

export const useCategoryPosts = (categoryId: string | undefined, currentPage: number) => {
  return useQuery(
    ['categoryPosts', categoryId, currentPage],
    () => client.get(`/api/categories/${categoryId}/posts?page=${currentPage}`),
    {
      keepPreviousData: true,
      onError: (error: any) => {
        toast.error(`${error.message}`);
      },
    },
  );
};
