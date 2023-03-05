import React, { VFC } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageClick: (pageNum: number) => void;
  handleFirstPageClick: () => void;
  handlePrevPageClick: () => void;
  handleNextPageClick: () => void;
  handleLastPageClick: () => void;
}

const Pagination: VFC<PaginationProps> = ({
  currentPage,
  totalPages,
  handlePageClick,
  handleFirstPageClick,
  handlePrevPageClick,
  handleNextPageClick,
  handleLastPageClick,
}) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <button onClick={handleFirstPageClick}>{"<<"}</button>
      <button onClick={handlePrevPageClick}>{"<"}</button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={currentPage === page ? "active" : ""}
        >
          {page}
        </button>
      ))}
      <button onClick={handleNextPageClick}>{">"}</button>
      <button onClick={handleLastPageClick}>{">>"}</button>
    </div>
  );
};

export default Pagination;
