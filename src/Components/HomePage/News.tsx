import { backUrl } from 'config';
import useSWR from 'swr';
import { NewsArticle } from 'typings/db';
import fetcher from 'utils/fetcher';

const News = () => {
  const { data: newsData, error: newsError } = useSWR(`${backUrl}/api/news/latest`, fetcher); // news 데이터 가져오기

  if (newsError) {
    return <div>Error occurred: {newsError.message}</div>;
  }

  if (!newsData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-start justify-center rounded bg-gray-50 h-60 dark:bg-gray-800">
      <h1 className="pl-2 font-bold text-sm mb-4 text-black dark:text-white">최신 뉴스</h1>
      {newsData?.items.map((news: NewsArticle, index: number) => {
        return (
          <div
            key={index}
            className="overflow-hidden whitespace-nowrap overflow-ellipsis w-full pl-2 text-xs text-gray-400 dark:text-gray-500"
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
