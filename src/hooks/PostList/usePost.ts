import { usePost } from 'apis/post';
import { useIncreasePostViews } from 'apis/postList';
import { useCallback, useEffect, useState } from 'react';

const PAGE_SIZE = 10;

const usePosts = (currentPage: number, searchTerm: string) => {
  const { data: postData, isLoading } = usePost(currentPage, searchTerm);
  const { mutateAsync: increasePostViews } = useIncreasePostViews();

  const posts = postData?.posts;
  const totalPosts = postData?.count ?? 0;
  const totalPages = Math.ceil(totalPosts / PAGE_SIZE);
  const startIdx = 0;
  const endIdx = PAGE_SIZE;
  const [currentPagePosts, setCurrentPagePosts] = useState(posts?.slice(startIdx, endIdx));

  useEffect(() => {
    if (postData) {
      setCurrentPagePosts(postData.posts.slice(startIdx, endIdx));
    }
  }, [postData]);

  const handlePostClick = useCallback(
    async (postId: any) => {
      const response = await increasePostViews(postId);

      const updatedPosts = currentPagePosts.map((post: any) => {
        if (post.id === postId) {
          return {
            ...post,
            views: response.data.post.views,
          };
        }

        return post;
      });

      setCurrentPagePosts(updatedPosts);
    },
    [currentPagePosts],
  );

  return {
    isLoading,
    postData,
    handlePostClick,
    currentPagePosts,
    totalPages,
  };
};

export default usePosts;
