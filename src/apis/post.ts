import { client } from 'apis';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

export interface PostData {
  title: string;
  content: string | undefined;
  categoryId: string;
  UserId: number;
}

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

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  const createPostMutation = useMutation(
    async (postData: PostData) => {
      const { data } = await client.post('/api/main/posts', postData);

      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('post');
      },
      onError: (error: any) => {
        toast.error(`${error.message}`);
      },
    },
  );

  return createPostMutation;
};

export const usePostUpdate = () => {
  const queryClient = useQueryClient();

  const updatePostMutation = useMutation(
    async ({ id, title, content }: { id: string | undefined; title: string; content: string }) => {
      const response = await client.put(`/api/main/posts/${id}`, { title, content });

      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('post');
      },
      onError: (error: any) => {
        toast.error(`${error.message}`);
      },
    },
  );

  return updatePostMutation;
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
      onError: (error: any) => {
        toast.error(`${error.message}`);
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
