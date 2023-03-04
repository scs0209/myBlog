import React, { VFC } from "react";
import fetcher from "utils/fetcher";
import useSWR from 'swr';
import { Link } from "react-router-dom";
import { PostLi } from "./styles";


const PostList = () => {
  const {data: posts, error} = useSWR("/api/posts", fetcher);

  if(error) return <div>에러가 발생했습니다.</div>
  if(!posts) return <div>게시글 몰록을 불러오는 중입니다.</div>

  return (
    <div className="List">
      <h2>게시글 목록</h2>
      <PostLi>
        <div className="list_grid list_title">
          <div>title</div>
          <div>views</div>
          <div>dates</div>
        </div>
        {posts.map((post: any) => {
          const createdDate = new Date(post.createdAt);
          const dateString = `${createdDate.getFullYear()}년 ${
            createdDate.getMonth() + 1
          }월 ${createdDate.getDate()}일`;
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
    </div>
  );
}

export default PostList;