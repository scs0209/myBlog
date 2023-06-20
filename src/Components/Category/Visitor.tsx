import React from "react";
import useSWR from 'swr';
import fetcher from "../../utils/fetcher";
import { backUrl } from "../../config";

const Visitor = () => {
  const { data: todayVisitorsData } = useSWR(`${backUrl}/api/visitors`, fetcher, {
  dedupingInterval: 3600000
});
  const { data: totalVisitorsData } = useSWR(`${backUrl}/api/total-visitors`, fetcher);

  const todayVisitors = todayVisitorsData || 0;
  const totalVisitors = totalVisitorsData?.totalVisitors || 0;

  return (
    <div className="w-full mb-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div id="fullWidthTabContent" className="border-t border-gray-200 dark:border-gray-600">
      <div className="bg-white rounded-lg md:p-8 dark:bg-gray-800" id="stats" role="tabpanel" aria-labelledby="stats-tab">
            <dl className="grid max-w-screen-xl grid-cols-2 gap-8 mx-auto text-gray-900 dark:text-white">
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-3xl font-extrabold">{todayVisitors}</dt>
                    <dd className="text-gray-500 dark:text-gray-400">today</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-3xl font-extrabold">{totalVisitors}</dt>
                    <dd className="text-gray-500 dark:text-gray-400">total</dd>
                </div>
            </dl>
      </div>
    </div>
</div>
  )
}

export default Visitor