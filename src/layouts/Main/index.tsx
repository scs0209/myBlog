import loadable from "@loadable/component";
import React, { useCallback, useState } from "react";
import { Link, Navigate, Route, Router, Routes, useNavigate, useParams } from "react-router-dom";
import { Header, MainContainer } from "./styles";
import useSWR from 'swr';
import fetcher from "../../utils/fetcher";
import Category from "../../Components/Category";
import CategoryList from "../../Components/CategoryList";
import axios from "axios";
import CreateCategoryModal from "Components/onCreateCategoryModal";
const Post = loadable(() => import('../../Pages/Post'));
const PostSubmit = loadable(() => import('../../Components/PostSubmit'));
const PostList = loadable(() => import('../../Components/PostList'));
const PostDetail = loadable(() => import('../../Components/PostDetail'));
const PostEdit = loadable(() => import('../../Components/PostEdit'));
const Login = loadable(() => import("../../Pages/Login"));
const SignUp = loadable(() => import("../../Pages/SignUp"));
const FindId = loadable(() => import("../../Pages/FindId"));
const FindPassword = loadable(() => import("../../Pages/FindPassword"));
const ChangePassword = loadable(() => import("../../Pages/ChangePassword"));

const MainPage = () => {
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const { data: userData, mutate } = useSWR("/api/users", fetcher);
  const [showPost, setShowPost] = useState(false);

  const onLogout = useCallback(() => {
    axios.post('/api/logout', null, {
      withCredentials: true
    })
    .then(() => {
      mutate(false, false);
    });
  }, [mutate])

  const onClickShowPost = useCallback(() => {
    setShowPost((prev) => !prev);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowCreateCategoryModal(false);
  }, []);

  const onClickCreateCategory = useCallback(() => {
    setShowCreateCategoryModal(true);
  }, []);
  
  // if(!userData){
  //   return <Navigate to="/main/login" />
  // }
  console.log(userData);

  return (
    <div>
      <Header>
        SCS's Blog!
        {userData?.role === "admin" && (
          <Link to="/main/write" onClick={onClickShowPost}>
            포스트 작성
          </Link>
        )}
        <div>
          {!userData ? (
            <Link to="/main/login" onClick={onClickShowPost}>
              <button>로그인</button>
            </Link>
          ) : <Link to="/main/password" onClick={onClickShowPost}>
              <button>비밀번호 변경</button>
            </Link>}
          <button onClick={onLogout}>로그아웃</button>
        </div>
      </Header>
      <MainContainer className="main-container">
        <div className="left-side">
          <Category />
          {userData?.role === "admin" && 
          <button onClick={onClickCreateCategory}>+</button>}
        </div>
        <div className="main">
          Main Layout
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
            {showPost && <Route path="/write" element={<Post />} />}
          </Routes>
        </div>
        <div className="right-side">
          <h3>Right Side</h3>
          {showPost && <PostSubmit />}
        </div>
      </MainContainer>
      <CreateCategoryModal
        show={showCreateCategoryModal}
        onCloseModal={onCloseModal}
        setShowCreateCategoryModal={setShowCreateCategoryModal}
      />
    </div>
  );
}

export default MainPage;