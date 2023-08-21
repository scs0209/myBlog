import { client } from 'apis';
import { useMutation, useQuery, useQueryClient } from 'react-query';

interface LikeInfo {
  likeCount: number;
  liked: boolean;
}

export const deletePost = (postId: string | undefined) => {
  return client.delete(`/api/main/posts/${postId}`);
};

export const likePostAPI = async (postId: string | undefined, userId: number) => {
  return client.post(`/api/posts/${postId}/like`, { UserId: userId, PostID: postId });
};

export const unlikePostAPI = async (postId: string | undefined) => {
  return client.delete(`/api/posts/${postId}/like`);
};

export const usePost = (currentPage: number, searchTerm: string) => {
  return useQuery(['posts', currentPage, searchTerm], async () => {
    const { data } = await client.get(`/api/main/posts?page=${currentPage}&search=${searchTerm}`);

    return data;
  });
};

export const usePostById = (id: string | undefined) => {
  return useQuery(['post', id], async () => {
    const { data } = await client.get(`/api/main/posts/${id}`);

    return data;
  });
};

export const usePostDelete = () => {
  const queryClient = useQueryClient();

  const deletePostMutation = useMutation(
    async (postId: string | undefined) => {
      await client.delete(`/api/main/posts/${postId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
      },
    },
  );

  return deletePostMutation;
};

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
