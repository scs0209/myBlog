import loadable from "@loadable/component";
import React, { useCallback, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Button, CreateCategoryButton, Footer, Header, HomeLink, Logo, MainContainer, StyledLink } from "./styles";
import useSWR from 'swr';
import fetcher from "../../utils/fetcher";
import Category from "../../Components/Category";
import CategoryList from "../../Components/CategoryList";
import axios from "axios";
import Avatar from 'react-avatar';
import CreateCategoryModal from "Components/onCreateCategoryModal";
import Menu from "../../Components/Menu";
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
  const [showPost, setShowPost] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const onLogout = useCallback(() => {
    axios.post(`${backUrl}/api/users/logout`, null, {
      withCredentials: true
    })
    .then(() => {
      mutate(false, false);
    });
  }, [mutate])

  const onClickShowPost = useCallback(() => {
    setShowPost((prev) => !prev);
  }, []);

  const onClickShowProfile = useCallback(() => {
    setShowProfile((prev) => !prev);
  }, []);

  const onCloseProfileMenu = useCallback((e: any) => {
    e.stopPropagation();
    setShowProfile(false);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowCreateCategoryModal(false);
  }, []);

  const onClickCreateCategory = useCallback(() => {
    setShowCreateCategoryModal(true);
  }, []);

  return (
    <div>
      <Header>
        <HomeLink to="/">
          <Logo
            src="/favicon.png"
            alt="logo"
            style={{ width: "60px", height: "60px", color: "black" }}
          />
          SCS's Blog!
        </HomeLink>
        {userData?.role === "admin" && (
          <StyledLink to="/main/write">포스트 작성</StyledLink>
        )}
        <div>
          {!userData ? (
            <Link to="/main/login" onClick={onClickShowPost}>
              <Button>Log In</Button>
            </Link>
          ) : (
            <span onClick={onClickShowProfile}>
              <Avatar
                name={userData?.name}
                src={userData?.avatar_url}
                size="30"
                round
                color="gray"
              />
              {showProfile && (
                <Menu
                  show={showProfile}
                  onCloseModal={onCloseProfileMenu}
                  style={{ top: "80px" }}
                >
                  <div className="profile-menu">
                    <Link to="/main/password" onClick={onClickShowPost}>
                      <Button>PW Change</Button>
                    </Link>
                    <Button onClick={onLogout}>Logout</Button>
                  </div>
                </Menu>
              )}
            </span>
          )}
        </div>
      </Header>
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