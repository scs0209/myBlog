import { client } from 'apis';

export const deletePost = (postId: string | undefined) => {
  return client.delete(`/api/main/posts/${postId}`, {
    withCredentials: true,
  });
};
