import loadable from "@loadable/component";
import React, { useCallback, useState } from "react";
import {  Route, Routes } from "react-router-dom";
import {  CreateCategoryButton, Footer, MainContainer } from "./styles";
import useSWR from 'swr';
import fetcher from "../../utils/fetcher";
import Category from "../../Components/Category";
import CategoryList from "../../Components/CategoryList";
import CreateCategoryModal from "Components/onCreateCategoryModal";
import Header from "../../Components/Header";
const Post = loadable(() => import('../../Pages/Post'));
const PostList = loadable(() => import('../../Components/PostList'));
const PostDetail = loadable(() => import('../../Components/PostDetail'));
const PostEdit = loadable(() => import('../../Components/PostEdit'));
const Login = loadable(() => import("../../Pages/Login"));
const SignUp = loadable(() => import("../../Pages/SignUp"));
const FindId = loadable(() => import("../../Pages/FindId"));
const FindPassword = loadable(() => import("../../Pages/FindPassword"));
const ChangePassword = loadable(() => import("../../Pages/ChangePassword"));

const backUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://port-0-server-p8xrq2mlfsc6kg2.sel3.cloudtype.app";
const MainPage = () => {
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const { data: userData, mutate } = useSWR(`${backUrl}/api/users`, fetcher);


  const onCloseModal = useCallback(() => {
    setShowCreateCategoryModal(false);
  }, []);

  const onClickCreateCategory = useCallback(() => {
    setShowCreateCategoryModal(true);
  }, []);

  return (
    <div>
      <Header />
      <MainContainer className="main-container">
        <div className="left-side">
          <Category />
          {userData?.role === "admin" && (
            <CreateCategoryButton onClick={onClickCreateCategory}>
              +
            </CreateCategoryButton>
          )}
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
      <Footer>
        2023 SCS - All rights reserved
      </Footer>
      <CreateCategoryModal
        show={showCreateCategoryModal}
        onCloseModal={onCloseModal}
        setShowCreateCategoryModal={setShowCreateCategoryModal}
      />
    </div>
  );
}

export default MainPage;