import { increasePostViews } from 'apis/postList';
import { backUrl } from 'config';
import { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';

const PAGE_SIZE = 10;

const usePosts = (currentPage: number, searchTerm: string) => {
  const {
    data: postData,
    error,
    mutate,
  } = useSWR(`${backUrl}/api/main/posts?page=${currentPage}&search=${searchTerm}`, fetcher);

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
      try {
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
      } catch (error: any) {
        console.error(error.response.data);
      }
    },
    [currentPagePosts],
  );

  return {
    postData,
    error,
    mutate,
    handlePostClick,
    currentPagePosts,
    totalPages,
  };
};

export default usePosts;
