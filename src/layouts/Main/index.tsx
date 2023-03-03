import loadable from "@loadable/component";
import React, { useCallback, useState } from "react";
import { Link, Route, Router, Routes } from "react-router-dom";
import { Header, MainContainer } from "./styles";
const Post = loadable(() => import('../../Pages/Post'));
const PostSubmit = loadable(() => import('../../Components/PostSubmit'));

const MainPage = () => {
  const [showPost, setShowPost] = useState(false);

  const onClickShowPost = useCallback(() => {
    setShowPost((prev) => !prev);
  }, [])

  return (
      <div>
        <Header>
          SCS's Blog!
          <Link to="/main/write" onClick={onClickShowPost}>포스트 작성</Link>
        </Header>
        <MainContainer className="main-container">
          <div className="left-side">
            <h3>category</h3>
          </div>
          <div className="main">
            Main Layout
            <Routes>
              {showPost && <Route path="/write" element={<Post />} />}
            </Routes>
          </div>
          <div className="right-side">
            <h3>Right Side</h3>
            {showPost && <PostSubmit /> }
          </div>
        </MainContainer>
      </div>
  );
}

export default MainPage;