import loadable from '@loadable/component';
import Footer from 'Components/common/Footer';
import { Route, Routes } from 'react-router-dom';

import CategoryList from '../../Pages/CategoryList';

const Post = loadable(() => import('../../Pages/Post'));
const PostList = loadable(() => import('../../Pages/PostList'));
const PostDetail = loadable(() => import('../../Pages/PostDetail'));
const PostEdit = loadable(() => import('../../Pages/PostEdit'));
const Login = loadable(() => import('../../Pages/Login'));
const SignUp = loadable(() => import('../../Pages/SignUp'));
const FindId = loadable(() => import('../../Pages/FindId'));
const FindPassword = loadable(() => import('../../Pages/FindPassword'));
const ChangePassword = loadable(() => import('../../Pages/ChangePassword'));
const Profile = loadable(() => import('../../Pages/Profile'));
const MyPage = loadable(() => import('../../Pages/MyPage'));

const MainPage = () => {
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
            <Route path="/my-page/:id" element={<MyPage />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MainPage;
