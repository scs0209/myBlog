import { client } from 'apis';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

export const useGetReply = (id: string | undefined) =>
  useQuery(['replies', id], async () => {
    const { data } = await client.get(`/api/posts/${id}/replies`);

    return data;
  });

export const useCreateReply = () => {
  const queryClient = useQueryClient();

  const createReplyMutation = useMutation(
    async (data: { commentId: number; newReply: object }) => {
      const response = await client.post(
        `/api/posts/comments/${data.commentId}/replies`,
        data.newReply,
      );

      return response.data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries('replies'),
      onError: (error: any) => {
        toast.error(`${error.message}`);
      },
    },
  );

  return createReplyMutation;
};

export const useUpdateReply = () => {
  const queryClient = useQueryClient();

  const updateReplyMutation = useMutation(
    async (data: { commentId: number; replyId: number; content: string }) => {
      const response = await client.put(
        `/api/posts/comments/${data.commentId}/replies/${data.replyId}`,
        { content: data.content },
      );

      return response.data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries('replies'),
      onError: (error: any) => {
        toast.error(`${error.message}`);
      },
    },
  );

  return updateReplyMutation;
};

export const useDeleteReply = () => {
  const queryClient = useQueryClient();

  const deleteReplyMutation = useMutation(
    async (data: { commentId: number; replyId: number }) => {
      const response = await client.delete(
        `/api/posts/comments/${data.commentId}/replies/${data.replyId}`,
      );

      return response.data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries('replies'),
      onError: (error: any) => {
        toast.error(`${error.message}`);
      },
    },
  );

  return deleteReplyMutation;
};
