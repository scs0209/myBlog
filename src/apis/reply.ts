import { client } from 'apis';

export const createReply = async (commentId: number, newReply: object): Promise<any> => {
  const response = await client.post(`/api/posts/comments/${commentId}/replies`, newReply, {
    withCredentials: true,
  });

  return response.data;
};

export const updateReply = async (
  commentId: number,
  replyId: number,
  content: string,
): Promise<any> => {
  const response = await client.put(
    `/api/posts/comments/${commentId}/replies/${replyId}`,
    { content },
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const deleteReply = async (commentId: number, replyId: number): Promise<any> => {
  const response = await client.delete(`/api/posts/comments/${commentId}/replies/${replyId}`, {
    withCredentials: true,
  });

  return response.data;
};
