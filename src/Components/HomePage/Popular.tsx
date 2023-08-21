import { useGetPopularPosts } from 'apis/post';
import { Link } from 'react-router-dom';
import { Post } from 'typings/db';

const Popular = () => {
  const { data, isError, isLoading } = useGetPopularPosts();

  if (isError) {
    return <div>Error occurred: {isError}</div>;
  }

  if (isLoading) {
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
