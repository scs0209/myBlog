import React from "react";
import { Carousel } from "flowbite-react";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { backUrl } from "../../config";
import { NewsArticle, Post } from "typings/db";
import { Link } from "react-router-dom";
import HeadInfo from "Components/common/HeadInfo";


const Home = () => {
  const { data, error } = useSWR(
    `${backUrl}/api/main/popular_posts?limit=5`,
    fetcher
  );
  const { data: newsData, error: newsError } = useSWR(
    `${backUrl}/api/news/latest`,
    fetcher
  ); // news 데이터 가져오기

  if (error) {
    return <div>Error occurred: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <HeadInfo title="Home" />
      <div className="p-5 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="flex items-center justify-center h-48 mb-6 rounded bg-gray-50 dark:bg-gray-800">
            <Carousel>
              <img src={require("../../images/banner.jpg")} alt="banner" />
              <img
                src={require("../../images/포트폴리오.PNG")}
                alt="portfolio"
              />
              <img
                src={require("../../images/FilmFinder.PNG")}
                alt="film-finder"
              />
              <img
                src={require("../../images/portfolio-next.PNG")}
                alt="portfolio-next"
              />
              <img src={require("../../images/shopfind.png")} alt="shop-find" />
            </Carousel>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div className="flex flex-col items-start justify-center rounded bg-gray-50 h-60 dark:bg-gray-800">
              <h1 className="text-sm font-bold pl-2 mb-4 text-black dark:text-white">
                인기 게시글
              </h1>
              {data?.popular_posts.map((post: Post) => {
                return (
                  <div
                    key={post.id}
                    className="overflow-hidden whitespace-nowrap overflow-ellipsis w-full pl-2 text-xs text-gray-400 dark:text-gray-500"
                  >
                    <Link
                      to={`/main/posts/${post.id}`}
                      className="hover:text-blue-500"
                    >
                      {post.title}
                    </Link>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col items-start justify-center rounded bg-gray-50 h-60 dark:bg-gray-800">
              <h1 className="pl-2 font-bold text-sm mb-4 text-black dark:text-white">
                최신 뉴스
              </h1>
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
                    >
                      {news.title}
                    </a>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-60 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                준비중...
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-60 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                준비중...
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;