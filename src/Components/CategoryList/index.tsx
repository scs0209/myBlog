import { PostLi } from "../../Components/PostList/styles";
import React, { useCallback, useState } from "react";
import { useParams } from "react-router";
import useSWR from 'swr';
import fetcher from "../../utils/fetcher";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { PaginationContainer } from "./styles";

const CategoryList = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [pageNumber, setPageNumber] = useState(0);

  const { data: categoryData, error: categoryError } = useSWR(
    `/api/categories/${categoryId}`,
    fetcher
  );

  const { data: postData, error: postError } = useSWR(
    `/api/categories/${categoryId}/posts`,
    fetcher
  );

  const handlePageClick = useCallback(
    (selectedItem: { selected: number }) => {
      console.log("click");
      if (pageNumber !== selectedItem.selected) {
        setPageNumber(selectedItem.selected);
      }
    },
    [pageNumber, setPageNumber]
  );
  const pageCount = !postData ? 0 : Math.ceil(postData.length / 10);
  console.log(postData.length, pageCount);

  // 현재 페이지에 해당하는 데이터만 추출
  const currentPageData = postData.slice(pageNumber * 10, (pageNumber + 1) * 10);
  console.log(postData, pageNumber * 10, (pageNumber + 1) * 10, pageNumber)

  if (categoryError || postError) return <div>에러가 발생했습니다.</div>;
  if (!categoryData || !postData) return <div>로딩중</div>;


  return (
    <div className="Category_container">
      <h2>게시글 목록</h2>
      <PostLi>
        <div className="list_grid list_title">
          <div>title</div>
          <div>views</div>
          <div>dates</div>
        </div>
        {currentPageData.map((post: any) => {
          const createdDate = new Date(post.createdAt);
          const dateString = `${createdDate.getFullYear()} - ${
            createdDate.getMonth() + 1
          } - ${createdDate.getDate()}`;
          return (
            <div className="list_grid" key={post.id}>
              <Link to={`/main/posts/${post.id}`}>
                <div>{post.title}</div>
              </Link>
              <div>{post.views}</div>
              <div>{dateString}</div>
            </div>
          );
        })}
      </PostLi>
      <PaginationContainer>
        <ReactPaginate
          pageCount={postData ? pageCount : 0}
          onPageChange={handlePageClick}
          containerClassName="pagination_container"
          pageClassName="pagination_item"
          activeClassName="pagination_item_active"
          previousClassName="pagination_item pagination_item_prev"
          nextClassName="pagination_item pagination_item_next"
          disabledClassName="pagination_item_disabled"
          breakClassName="pagination_item pagination_item_break"
          previousLabel="< previous"
          nextLabel="next >"
          marginPagesDisplayed={1}
          pageRangeDisplayed={5}
        />
      </PaginationContainer>
    </div>
  );
}

export default CategoryList;