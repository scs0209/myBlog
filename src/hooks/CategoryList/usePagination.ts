import { startTransition, useCallback } from 'react';
import { useNavigate } from 'react-router';

export const usePagination = (categoryId: string | undefined) => {
  const navigate = useNavigate();

  const handlePageChange = useCallback(
    (newPage: number) => {
      startTransition(() => {
        navigate(`/main/categories/${categoryId}?page=${newPage}`);
      });
    },
    [navigate],
  );

  return { handlePageChange };
};
