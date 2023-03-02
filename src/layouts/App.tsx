import loadable from '@loadable/component'
import React from "react";
import {  Route, Routes } from "react-router";
const Login = loadable(() => import('../Pages/Login'));
const SignUp = loadable(() => import('../Pages/SignUp'));
const MainPage = loadable(() => import('./Main'));

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
  );
}

export default App;




