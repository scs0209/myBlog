import loadable from "@loadable/component";
import {  Route, Routes } from "react-router-dom";
import useSWR from 'swr';
import fetcher from "../../utils/fetcher";
import CategoryList from "../../Pages/CategoryList";
import { backUrl } from "../../config";
const Post = loadable(() => import('../../Pages/Post'));
const PostList = loadable(() => import('../../Pages/PostList'));
const PostDetail = loadable(() => import('../../Pages/PostDetail'));
const PostEdit = loadable(() => import('../../Pages/PostEdit'));
const Login = loadable(() => import("../../Pages/Login"));
const SignUp = loadable(() => import("../../Pages/SignUp"));
const FindId = loadable(() => import("../../Pages/FindId"));
const FindPassword = loadable(() => import("../../Pages/FindPassword"));
const ChangePassword = loadable(() => import("../../Pages/ChangePassword"));
const Profile = loadable(() => import("../../Pages/Profile"));

const MainPage = () => {
  // const { data: userData, mutate } = useSWR(`${backUrl}/api/users`, fetcher);

  return (
    <>
      <div className="p-0 md:p-12 sm:ml-64 dark:bg-slate-700">
        <div className="p-6 dark:border-gray-700 mt-14">
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
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default MainPage;