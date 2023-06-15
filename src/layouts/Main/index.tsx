import loadable from "@loadable/component";
import {  Route, Routes } from "react-router-dom";
import {  MainContainer } from "./styles";
import useSWR from 'swr';
import fetcher from "../../utils/fetcher";
import Category from "../../Components/Category";
import CategoryList from "../../Components/CategoryList";
import Header from "../../Components/common/Header";
import { backUrl } from "../../config";
import Footer from "../../Components/common/Footer";
import { useCallback, useEffect, useState } from "react";
const Post = loadable(() => import('../../Pages/Post'));
const PostList = loadable(() => import('../../Components/PostList'));
const PostDetail = loadable(() => import('../../Components/PostDetail'));
const PostEdit = loadable(() => import('../../Components/PostEdit'));
const Login = loadable(() => import("../../Pages/Login"));
const SignUp = loadable(() => import("../../Pages/SignUp"));
const FindId = loadable(() => import("../../Pages/FindId"));
const FindPassword = loadable(() => import("../../Pages/FindPassword"));
const ChangePassword = loadable(() => import("../../Pages/ChangePassword"));

const MainPage = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { data: userData, mutate } = useSWR(`${backUrl}/api/users`, fetcher);

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
    <div>
      <Header toggleSidebar={toggleSidebar} />
      <MainContainer className="main-container">
        <div className="left-side">
          <Category showSidebar={showSidebar} />
        </div>
        <div className="main">
          <Routes>
            <Route path="/posts" element={<PostList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/find-id" element={<FindId />} />
            <Route path="/find-password" element={<FindPassword />} />
            <Route path="/password" element={<ChangePassword />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/posts/:id/edit" element={<PostEdit />} />
            <Route path="/categories/:categoryId" element={<CategoryList />} />
            <Route path="/write" element={<Post />} />
          </Routes>
        </div>
        <div className="right-side">
          <img
            src={require("../../images/banner.jpg")}
            alt="광고 배너"
            style={{ width: "90%", margin: "0 0.25rem 0 0.25rem" }}
          />
        </div>
      </MainContainer>
      <Footer />
    </div>
  );
}

export default MainPage;