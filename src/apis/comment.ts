import { client } from 'apis';

export const createComment = async (postId: string | undefined, content: string): Promise<any> => {
  const response = await client.post(`/api/posts/${postId}/comments`, {
    content,
    postId,
  });

  return response.data;
};

export const updateComment = async (commentId: number, content: string): Promise<any> => {
  const response = await client.put(`/api/posts/comments/${commentId}`, {
    content,
  });

  return response.data;
};

export const deleteComment = async (commentId: number): Promise<any> => {
  const response = await client.delete(`/api/posts/comments/${commentId}`);

  return response.data;
};
