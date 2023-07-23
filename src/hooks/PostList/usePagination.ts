import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const usePagination = (searchTerm: string) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = useCallback(
    (pageNum: number) => {
      setCurrentPage(pageNum);
      navigate(`/main/posts?page=${pageNum}&search=${searchTerm}`);
    },
    [setCurrentPage, navigate, searchTerm],
  );

  return { currentPage, handlePageChange };
};

export default usePagination;
