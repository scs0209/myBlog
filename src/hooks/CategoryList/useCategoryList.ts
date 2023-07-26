import { backUrl } from 'config';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';

export const useCategoryList = (categoryId: string | undefined) => {
  const params = new URLSearchParams(useLocation().search);
  const pageNum = parseInt(params.get('page') || '1', 10);

  const [currentPage, setCurrentPage] = useState(pageNum);

  useEffect(() => {
    setCurrentPage(pageNum);
  }, [pageNum]);

  const { data: postData, error: postError } = useSWR(
    `${backUrl}/api/categories/${categoryId}/posts?page=${currentPage}`,
    fetcher,
  );

  return { postData, postError, currentPage };
};
