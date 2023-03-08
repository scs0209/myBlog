import React, { useCallback, useEffect, useState, VFC } from "react";
import fetcher from "utils/fetcher";
import useSWR from 'swr';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { PostLi } from "./styles";
import Pagination from "../../Components/Pagination";
import Search from "../../Components/Search";


const PostList = () => {
  const navigate = useNavigate();
  const location = useLocation();// 현재 경로(location) 정보 가져오기
  const queryParams = new URLSearchParams(location.search);
  const PAGE_SIZE = 10; //한 페이지에서 가져올 데이터의 한계치를 나타내는 값
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: postData,
    error,
    mutate,
  } = useSWR(
    `/api/main/posts?page=${currentPage}&search=${searchTerm}`,
    fetcher
  );

  const posts = postData?.posts;
  const totalPosts = postData?.count;
  const totalPages = Math.ceil(totalPosts / PAGE_SIZE);

  const startIdx = 0;
  const endIdx = PAGE_SIZE
  const currentPagePosts = posts?.slice(startIdx, endIdx);


  const handlePageClick = useCallback(
    (pageNum: number) => {
      setCurrentPage(pageNum);
      navigate(`/main/posts?page=${pageNum}&search=${searchTerm}`);
      mutate(`/api/main/posts?page=${pageNum}&search=${searchTerm}`, false);
    },
    [setCurrentPage, mutate, navigate, searchTerm]
  );

  const handleFirstPageClick = useCallback(() => {
    handlePageClick(1);
  }, [handlePageClick]);

  const handlePrevPageClick = useCallback(() => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      navigate(`/main/posts?page=${prevPage}&search=${searchTerm}`);
      mutate(`/api/main/posts?page=${prevPage}&search=${searchTerm}`, true); // 수정된 부분
    }
  }, [currentPage, setCurrentPage, mutate, navigate, searchTerm]);

  const handleNextPageClick = useCallback(() => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      navigate(`/main/posts?page=${nextPage}&search=${searchTerm}`);
      mutate(`/api/main/posts?page=${nextPage}&search=${searchTerm}`, true); // 수정된 부분
    }
  }, [currentPage, totalPages, setCurrentPage, mutate, navigate, searchTerm]);

  const handleLastPageClick = useCallback(() => {
    handlePageClick(totalPages);
  }, [handlePageClick, totalPages]);

  const handleSearch = useCallback(
    (keyword: string) => {
      setSearchTerm(keyword);
      setCurrentPage(1);
      navigate(`/main/posts?page=1&search=${keyword}`);
      mutate(`/api/main/posts?page=1&search=${keyword}`, false);
    },
    [setSearchTerm, setCurrentPage, navigate, mutate]
  );

  const handleGoBack = useCallback(() => {
    if (location.pathname !== "/main/posts" || queryParams.get("search")) {
      navigate("/main/posts" + location.search);
    }
  }, [location.pathname, navigate, queryParams]);

  useEffect(() => {
    window.addEventListener("popstate", handleGoBack);

    return () => {
      window.removeEventListener("popstate", handleGoBack);
    };
  }, [handleGoBack]);  


  if (error) return <div>에러가 발생했습니다.</div>;
  if (!Array.isArray(posts)) return <div>게시글 몰록을 불러오는 중입니다.</div>;
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
              <Link to={`/main/posts/${post.id}`}>
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
      <Search onSearch={handleSearch} />
    </div>
  );
}

export default PostList;