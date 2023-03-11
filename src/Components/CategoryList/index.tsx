import { PostLi } from "../../Components/PostList/styles";
import React from "react";
import { useParams } from "react-router";
import useSWR from 'swr';
import fetcher from "../../utils/fetcher";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  const { data: categoryData, error: categoryError } = useSWR(`/api/categories/${categoryId}`, fetcher);

  const { data: postData, error: postError } = useSWR(`/api/categories/${categoryId}/posts`, fetcher);
  console.log(postData);



  if(categoryError || postError) return <div>에러가 발생했습니다.</div>
  if(!categoryData || !postData) return <div>로딩중</div>


  return (
    <div className="Category_container">
      <h2>게시글 목록</h2>
      <PostLi>
        <div className="list_grid list_title">
          <div>title</div>
          <div>views</div>
          <div>dates</div>
        </div>
        {postData.map((post: any) => {
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
    </div>
  );
}

export default CategoryList;