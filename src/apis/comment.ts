import { client } from 'apis';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

export const useGetComment = (id: string | undefined) =>
  useQuery(['comments', id], async () => {
    const { data } = await client.get(`/api/posts/${id}/comments`);

    return data;
  });

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  const createCommentMutation = useMutation(
    async (data: { postId: string | undefined; content: string }) => {
      const response = await client.post(`/api/posts/${data.postId}/comments`, data);

      return response.data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries('comments'),
      onError: (error: any) => {
        toast.error(`Login failed: ${error.response.data}`);
      },
    },
  );

  return createCommentMutation;
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  const updateCommentMutation = useMutation(
    async (data: { commentId: number; content: string }) => {
      const response = await client.put(`/api/posts/comments/${data.commentId}`, {
        content: data.content,
      });

      return response.data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries('comments'),
      onError: (error: any) => {
        toast.error(`Login failed: ${error.message}`);
      },
    },
  );

  return updateCommentMutation;
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  const deleteCommentMutation = useMutation(
    async (commentId: number) => {
      await client.delete(`/api/posts/comments/${commentId}`);
    },
    {
      onSuccess: () => queryClient.invalidateQueries('comments'),
      onError: (error: any) => {
        toast.error(`Login failed: ${error.message}`);
      },
    },
  );

  return deleteCommentMutation;
};
