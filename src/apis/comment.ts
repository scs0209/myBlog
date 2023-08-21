import { client } from 'apis';
import { useQuery } from 'react-query';

export const useGetComment = (id: string | undefined) =>
  useQuery(['comments', id], async () => {
    const { data } = await client.get(`/api/posts/${id}/comments`);

    return data;
  });

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
