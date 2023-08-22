import { useNews } from 'apis/news';
import { NewsArticle } from 'typings/db';

const News = () => {
  const { data: newsData, isError: newsError } = useNews(); // news 데이터 가져오기

  if (newsError) {
    return <div>Error occurred: {newsError.valueOf()}</div>;
  }

  return (
    <div className="flex flex-col items-start justify-center rounded bg-gray-50 h-60 dark:bg-gray-800">
      <h1 className="pl-2 mb-4 text-sm font-bold text-black dark:text-white">최신 뉴스</h1>
      {newsData?.items.map((news: NewsArticle, index: number) => {
        return (
          <div
            key={index}
            className="w-full pl-2 overflow-hidden text-xs text-gray-400 whitespace-nowrap overflow-ellipsis dark:text-gray-500"
          >
            <a
              href={`${news.originallink}`}
              target="_blank"
              className="hover:text-blue-500"
              rel="noreferrer"
            >
              {news.title}
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default News;
