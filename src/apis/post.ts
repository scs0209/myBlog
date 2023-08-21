import { client } from 'apis';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const usePost = (currentPage: number, searchTerm: string) => {
  return useQuery(['posts', currentPage, searchTerm], async () => {
    const { data } = await client.get(`/api/main/posts?page=${currentPage}&search=${searchTerm}`);

    return data;
  });
};

export const usePostById = (id: string | undefined) => {
  return useQuery(['post', id], async () => {
    const { data } = await client.get(`/api/main/posts/${id}`);

    return data;
  });
};

export const usePostDelete = () => {
  const queryClient = useQueryClient();

  const deletePostMutation = useMutation(
    async (postId: string | undefined) => {
      await client.delete(`/api/main/posts/${postId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
      },
    },
  );

  return deletePostMutation;
};

export const useGetPopularPosts = () =>
  useQuery('popularPosts', async () => {
    const { data } = await client.get('/api/main/popular_posts?limit=5');

    return data;
  });
