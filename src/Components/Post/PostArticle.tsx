import { Link } from 'react-router-dom';

interface Props {
  title: string;
  content: string;
  views: number;
  date: string;
  id: number;
  onClick: () => void;
}

const PostArticle = ({ title, content, views, date, id, onClick }: Props) => {
  return (
    <article className="py-6 cursor-pointer transition-shadow duration-200 hover:shadow-lg hover:opacity-60">
      <div className="flex items-center justify-between mb-3 text-gray-500">
        <div>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 hover:bg-blue-200 dark:hover:bg-blue-300 dark:text-blue-800 mb-2">
            #게시글
          </span>
        </div>
        <span className="text-sm">{date}</span>
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:underline">
        <Link to={`/main/posts/${id}`} onClick={onClick}>
          {title}
        </Link>
      </h2>
      <p className="mb-5 w-52 text-gray-500 dark:text-gray-400 line-clamp-2">
        {content.slice(0, 200)}
      </p>
      <div className="flex items-center justify-between">
        <span className="font-medium dark:text-white">views: {views}</span>

        <Link
          className="inline-flex items-center font-medium text-blue-600 hover:underline dark:text-blue-500"
          to={`/main/posts/${id}`}
          onClick={onClick}
        >
          Read more
          <svg
            className="w-4 h-4 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default PostArticle;
