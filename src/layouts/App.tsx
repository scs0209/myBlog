import loadable from '@loadable/component'
import Header from '../Components/common/Header';
import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Footer from '../Components/common/Footer';
import Category from '../Components/Category';
import { Flowbite } from "flowbite-react";
const MainPage = loadable(() => import('./Main'));

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
    window.addEventListener("resize", updateSidebarState);

    // 컴포넌트 해제 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", updateSidebarState);
    };
  }, [updateSidebarState]);

  return (
    <Flowbite>
      <div className="dark:bg-slate-700">
        <Header toggleSidebar={toggleSidebar} />
        <Category showSidebar={showSidebar} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/main/*" element={<MainPage />} />
        </Routes>
        <Footer />
      </div>
    </Flowbite>
  );
}

export default App;




