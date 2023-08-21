import { client } from 'apis';
import { useMutation, useQuery, useQueryClient } from 'react-query';

interface LikeInfo {
  likeCount: number;
  liked: boolean;
}

export const useLikeInfo = (postId: string | undefined) => {
  return useQuery(['likeInfo', postId], async () => {
    const { data } = await client.get(`/api/posts/${postId}/like-info`);

    return data;
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();

  const likePostMutation = useMutation(
    async ({ postId, userId }: { postId: string | undefined; userId: number }) => {
      const { data } = await client.post(`/api/posts/${postId}/like`, {
        UserId: userId,
        PostID: postId,
      });

      return data;
    },
    {
      onMutate: async ({ postId }) => {
        await queryClient.cancelQueries(['likeInfo', postId]);

        const previousLikeInfo = queryClient.getQueryData(['likeInfo', postId]);

        queryClient.setQueryData<LikeInfo | undefined>(['likeInfo', postId], (oldData) => {
          if (!oldData) return undefined;

          const newData = { ...oldData, liked: true, likeCount: oldData.likeCount + 1 };

          return newData;
        });

        return { previousLikeInfo };
      },
      onError: (_error, _variables, context) => {
        if (context) {
          queryClient.setQueryData(['likeInfo'], context.previousLikeInfo);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('likeInfo');
      },
    },
  );

  return likePostMutation;
};

export const useUnlikePost = () => {
  const queryClient = useQueryClient();

  const unlikePostMutation = useMutation(
    async (postId: string | undefined) => {
      const { data } = await client.delete(`/api/posts/${postId}/like`);

      return data;
    },
    {
      onMutate: async (postId) => {
        await queryClient.cancelQueries(['likeInfo', postId]);

        const previousLikeInfo = queryClient.getQueryData(['likeInfo', postId]);

        queryClient.setQueryData<LikeInfo | undefined>(['likeInfo', postId], (oldData) => {
          if (!oldData) return undefined;

          const newData = { ...oldData, liked: false, likeCount: oldData.likeCount - 1 };

          return newData;
        });

        return { previousLikeInfo };
      },
      onError: (_error, _variables, context) => {
        if (context) {
          queryClient.setQueryData(['likeInfo'], context.previousLikeInfo);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('likeInfo');
      },
    },
  );

  return unlikePostMutation;
};
