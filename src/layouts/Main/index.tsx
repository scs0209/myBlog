import React from "react";
import { Header, MainContainer } from "./styles";

const MainPage = () => {
  return (
    <div>
      <Header>SCS's Blog!</Header>
      <MainContainer className="main-container">
        <div className="left-side">
          <h3>category</h3>
        </div>
        <div>Main Layout</div>
        <div className="right-side">
          <h3>Right Side</h3>
        </div>
      </MainContainer>
    </div>
  );
}

export default MainPage;