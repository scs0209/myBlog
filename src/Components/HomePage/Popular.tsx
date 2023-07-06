import { backUrl } from 'config';
import React from 'react';
import { Link } from 'react-router-dom';
import useSWR from 'swr';
import { Post } from 'typings/db';
import fetcher from 'utils/fetcher';

const Popular = () => {
  const { data, error } = useSWR(`${backUrl}/api/main/popular_posts?limit=5`, fetcher);

  if (error) {
    return <div>Error occurred: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-start justify-center rounded bg-gray-50 h-60 dark:bg-gray-800">
      <h1 className="text-sm font-bold pl-2 mb-4 text-black dark:text-white">인기 게시글</h1>
      {data?.popular_posts.map((post: Post) => {
        return (
          <div
            key={post.id}
            className="overflow-hidden whitespace-nowrap overflow-ellipsis w-full pl-2 text-xs text-gray-400 dark:text-gray-500"
          >
            <Link to={`/main/posts/${post.id}`} className="hover:text-blue-500">
              {post.title}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Popular;
