import { useGetPopularPosts } from 'apis/post';
import { Link } from 'react-router-dom';
import { Post } from 'typings/db';

const Popular = () => {
  const { data, isError } = useGetPopularPosts();

  if (isError) {
    return <div>Error occurred: {isError}</div>;
  }

  return (
    <div className="flex flex-col items-start justify-center rounded bg-gray-50 h-60 dark:bg-gray-800">
      <h1 className="pl-2 mb-4 text-sm font-bold text-black dark:text-white">인기 게시글</h1>
      {data?.popular_posts.map((post: Post) => {
        return (
          <div
            key={post.id}
            className="w-full pl-2 overflow-hidden text-xs text-gray-400 whitespace-nowrap overflow-ellipsis dark:text-gray-500"
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
