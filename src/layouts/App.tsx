import loadable from '@loadable/component'
import React from "react";
import { Route, Routes } from "react-router";
const MainPage = loadable(() => import('./Main'));

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/main/*" element={<MainPage />} />
      </Routes>
  );
}

export default App;




