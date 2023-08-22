import { Spinner } from 'flowbite-react';
import { useIsFetching } from 'react-query';

function GlobalLoading() {
  const isFetching = useIsFetching(); // 현재 원활하게 진행 중인 쿼리의 수를 가져옵니다.

  console.log('isFetching:', isFetching);

  return isFetching ? (
    <>
      <div className="flex items-center justify-center h-screen text-center ">
        <Spinner size="xl" color="info" />
        <span className="text-4xl font-bold text-blue-500">Loading...</span>
      </div>
    </>
  ) : null;
}

export default GlobalLoading;
