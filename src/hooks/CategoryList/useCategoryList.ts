import { useCategoryPosts } from 'apis/category';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

export const useCategoryList = (categoryId: string | undefined) => {
  const params = new URLSearchParams(useLocation().search);
  const pageNum = parseInt(params.get('page') || '1', 10);

  const [currentPage, setCurrentPage] = useState(pageNum);

  useEffect(() => {
    setCurrentPage(pageNum);
  }, [pageNum]);

  const {
    data: postData,
    isError: postError,
    isLoading,
  } = useCategoryPosts(categoryId, currentPage);

  return { postData, postError, currentPage };
};
