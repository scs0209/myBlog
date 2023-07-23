import { client } from 'apis';

export const increasePostViews = (postId: any) => {
  return client.post(`/api/main/posts/${postId}/views`, null, {
    withCredentials: true,
  });
};
