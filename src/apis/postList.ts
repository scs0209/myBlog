import { clientWithoutContentType } from 'apis';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

export const increasePostViews = (postId: any) => {
  return clientWithoutContentType.post(`/api/main/posts/${postId}/views`, null, {
    withCredentials: true,
  });
};

export const useIncreasePostViews = () => {
  const increasePostViewsMutation = useMutation(
    async (postId: any) => {
      const { data } = await clientWithoutContentType.post(
        `/api/main/posts/${postId}/views`,
        null,
        {
          withCredentials: true,
        },
      );

      return data;
    },
    {
      onError: (error: any) => {
        toast.error(`Failed to increase post views: ${error.message}`);
      },
    },
  );

  return increasePostViewsMutation;
};
