import { client } from 'apis';

export const deletePost = (postId: string | undefined) => {
  return client.delete(`/api/main/posts/${postId}`, {
    withCredentials: true,
  });
};

export const likePostAPI = async (postId: string | undefined, userId: number) => {
  return client.post(
    `/api/posts/${postId}/like`,
    { UserId: userId, PostID: postId },
    { withCredentials: true },
  );
};

export const unlikePostAPI = async (postId: string | undefined) => {
  return client.delete(`/api/posts/${postId}/like`, { withCredentials: true });
};
