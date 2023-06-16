import React, { useCallback, useState } from "react";
import { useParams } from "react-router";
import useSWR from 'swr';
import fetcher from "../../utils/fetcher";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { PaginationContainer } from "./styles";


const backUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://port-0-server-p8xrq2mlfsc6kg2.sel3.cloudtype.app";
const CategoryList = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [pageNumber, setPageNumber] = useState(0);

  const { data: categoryData, error: categoryError } = useSWR(
    `${backUrl}/api/categories/${categoryId}`,
    fetcher
  );

  const { data: postData, error: postError } = useSWR(
    `${backUrl}/api/categories/${categoryId}/posts`,
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

  // 현재 페이지에 해당하는 데이터만 추출
  const currentPageData = postData?.slice(pageNumber * 10, (pageNumber + 1) * 10);
  console.log(postData, pageNumber * 10, (pageNumber + 1) * 10, pageNumber)

  if (categoryError || postError) return <div>에러가 발생했습니다.</div>;
  if (!categoryData || !postData) return <div>로딩중</div>;


  return (
    <div>
      <h1 className="text-3xl font-bold mb-3">게시글 목록</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                title
              </th>
              <th scope="col" className="px-6 py-3">
                views
              </th>
              <th scope="col" className="px-6 py-3">
                dates
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPageData?.map((post: any) => {
              const createdDate = new Date(post.createdAt);
              const dateString = `${createdDate.getFullYear()} - ${
                createdDate.getMonth() + 1
              } - ${createdDate.getDate()}`;
              return (
                <tr
                  key={post.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Link to={`/main/posts/${post.id}`}>{post.title}</Link>
                  </th>
                  <td className="px-6 py-4">{post.views}</td>
                  <td className="px-6 py-4">{dateString}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
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
          previousLabel="< prev"
          nextLabel="next >"
          marginPagesDisplayed={1}
          pageRangeDisplayed={5}
        />
      </PaginationContainer>
    </div>
  );
}

export default CategoryList;