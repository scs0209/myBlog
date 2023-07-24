import { clientWithoutContentType } from 'apis';

export const increasePostViews = (postId: any) => {
  return clientWithoutContentType.post(`/api/main/posts/${postId}/views`, null, {
    withCredentials: true,
  });
};
