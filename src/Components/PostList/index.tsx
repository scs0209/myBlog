import React, { useCallback, useState, VFC } from "react";
import fetcher from "utils/fetcher";
import useSWR from 'swr';
import { Link } from "react-router-dom";
import { PostLi } from "./styles";
import Pagination from "../../Components/Pagination";


const PostList = () => {
  const PAGE_SIZE = 10;//한 페이지에서 가져올 데이터의 한계치를 나타내는 값
  const [currentPage, setCurrentPage] = useState(1);
  const { data: postData, error, mutate } = useSWR(`/api/posts?page=${currentPage}`, fetcher);

  console.log(currentPage);
  const posts = postData?.posts;
  console.log(posts);
  const totalPosts = postData?.count;
  const totalPages = Math.ceil(totalPosts/PAGE_SIZE)
  console.log(totalPages);

  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const currentPagePosts = posts?.slice(startIdx, endIdx);
  console.log(startIdx, endIdx, currentPagePosts); // => currentPagePost []빈 배열로 나옴

  const handlePageClick = useCallback((pageNum: number) => {
    setCurrentPage(pageNum);
    mutate(`/api/posts?page=${pageNum}`, false);
  }, [setCurrentPage, mutate]);

  const handleFirstPageClick = useCallback(() => {
    handlePageClick(1);
  }, [handlePageClick]);

  const handlePrevPageClick = useCallback(() => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      mutate(`/api/posts?page=${prevPage}`, true); // 수정된 부분
    }
  }, [currentPage, setCurrentPage, mutate]);

  const handleNextPageClick = useCallback(() => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      mutate(`/api/posts?page=${nextPage}`, true); // 수정된 부분
    }
  }, [currentPage, totalPages, setCurrentPage, mutate]);

  const handleLastPageClick = useCallback(() => {
    handlePageClick(totalPages)
  }, [handlePageClick, totalPages])


  if(error) return <div>에러가 발생했습니다.</div>
  if(!Array.isArray(posts)) return <div>게시글 몰록을 불러오는 중입니다.</div>
  if (currentPagePosts.length === undefined) return <div>로딩중...</div>;


  return (
    <div className="List">
      <h2>게시글 목록</h2>
      <PostLi>
        <div className="list_grid list_title">
          <div>title</div>
          <div>views</div>
          <div>dates</div>
        </div>
        {currentPagePosts?.map((post: any) => {
          const createdDate = new Date(post.createdAt);
          const dateString = `${createdDate.getFullYear()} - ${
            createdDate.getMonth() + 1
          } - ${createdDate.getDate()}`;
          return (
            <div className="list_grid" key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <div>{post.title}</div>
              </Link>
              <div></div>
              <div>{dateString}</div>
            </div>
          );
        })}
      </PostLi>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageClick={handlePageClick}
        handleFirstPageClick={handleFirstPageClick}
        handlePrevPageClick={handlePrevPageClick}
        handleNextPageClick={handleNextPageClick}
        handleLastPageClick={handleLastPageClick}
      />
    </div>
  );
}

export default PostList;