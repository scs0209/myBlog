/* eslint-disable */
import 'react-toastify/dist/ReactToastify.css';

import loadable from '@loadable/component';
import GlobalLoading from 'Components/common/GlobalLoading';
import ErrorBoundary, { FallbackProps } from 'Components/ErrorHandling/ErrorBoundary';
import ErrorFallback from 'Components/ErrorHandling/ErrorFallback';
import { Flowbite } from 'flowbite-react';
import React, { useCallback, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider, useQueryErrorResetBoundary } from 'react-query';
import { Route, Routes } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';

import Category from '../Components/Category';
import Header from '../Components/common/Header';

export const queryErrorHandler = (error: any) => {
  return <div className="fixed bottom-0 h-screen text-8xl">{error.message}</div>;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
      retry: 0,
      suspense: true,
    },
  },
});

const MainPage = loadable(() => import('./Main'));
const Home = loadable(() => import('../Pages/HomePage'));

const App = () => {
  const notify = () => toast('Wow so easy!');
  const { reset } = useQueryErrorResetBoundary();
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = useCallback(() => {
    setShowSidebar((prevShowSidebar) => !prevShowSidebar);
  }, []);

  const updateSidebarState = useCallback(() => {
    // 화면 너비가 640 픽셀 이상인 경우 사이드바를 항상 열린 상태로 유지
    if (window.innerWidth >= 640) {
      setShowSidebar(true);
    } else {
      setShowSidebar(false);
    }
  }, []);

  useEffect(() => {
    // 초기 상태 업데이트
    updateSidebarState();

    // resize 이벤트 리스너 추가
    window.addEventListener('resize', updateSidebarState);

    // 컴포넌트 해제 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', updateSidebarState);
    };
  }, [updateSidebarState]);

  return (
    <Flowbite>
      <ErrorBoundary
        fallback={(props: FallbackProps) => <ErrorFallback {...props} />}
        onReset={reset}
      >
        <QueryClientProvider client={queryClient}>
          <div className="dark:bg-slate-700">
            <Header toggleSidebar={toggleSidebar} />
            <Category showSidebar={showSidebar} />
            <GlobalLoading />
            <ToastContainer />
            <div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/main/*" element={<MainPage />} />
              </Routes>
            </div>
          </div>
        </QueryClientProvider>
      </ErrorBoundary>
    </Flowbite>
  );
};

export default App;
