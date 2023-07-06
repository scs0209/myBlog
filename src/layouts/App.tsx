import loadable from '@loadable/component';
import { Flowbite } from 'flowbite-react';
import React, { useCallback, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';

import Category from '../Components/Category';
import Header from '../Components/common/Header';

const MainPage = loadable(() => import('./Main'));
const Home = loadable(() => import('../Pages/HomePage'));

const App = () => {
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
      <div className="dark:bg-slate-700">
        <Header toggleSidebar={toggleSidebar} />
        <Category showSidebar={showSidebar} />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/main/*" element={<MainPage />} />
          </Routes>
        </div>
      </div>
    </Flowbite>
  );
};

export default App;
