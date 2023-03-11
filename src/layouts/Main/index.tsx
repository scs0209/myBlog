import loadable from "@loadable/component";
import React, { useCallback, useState } from "react";
import { Link, Navigate, Route, Router, Routes, useNavigate, useParams } from "react-router-dom";
import { Header, MainContainer } from "./styles";
import useSWR from 'swr';
import fetcher from "../../utils/fetcher";
import Category from "../../Components/Category";
import CategoryList from "../../Components/CategoryList";
import axios from "axios";
const Post = loadable(() => import('../../Pages/Post'));
const PostSubmit = loadable(() => import('../../Components/PostSubmit'));
const PostList = loadable(() => import('../../Components/PostList'));
const PostDetail = loadable(() => import('../../Components/PostDetail'));
const PostEdit = loadable(() => import('../../Components/PostEdit'));

const MainPage = () => {
    const { data: userData, mutate } = useSWR("/api/users", fetcher, {
      dedupingInterval: 5000,
    });
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
  
  if(!userData){
    return <Navigate to="/login" />
  }

  return (
    <div>
      <Header>
        SCS's Blog!
        <Link to="/main/write" onClick={onClickShowPost}>
          포스트 작성
        </Link>
        <button onClick={onLogout}>로그아웃</button>
      </Header>
      <MainContainer className="main-container">
        <div className="left-side">
          <Category />
        </div>
        <div className="main">
          Main Layout
          <Routes>
            <Route path="/posts" element={<PostList />} />
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
    </div>
  );
}

export default MainPage;