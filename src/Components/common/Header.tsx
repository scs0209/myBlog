/* eslint-disable */
import { DarkThemeToggle } from 'flowbite-react';
import React, { memo, useCallback, useState, VFC } from 'react';
import Avatar from 'react-avatar';
import { Link, useNavigate } from 'react-router-dom';
import useSWR from 'swr';

import { backUrl } from '../../config';
import fetcher from '../../utils/fetcher';
import ProfileModal from '../ProfileModal';
import { useLogout } from 'apis/auth';

interface Props {
  toggleSidebar: () => void;
}

const Header: VFC<Props> = ({ toggleSidebar }) => {
  const { data: userData, mutate } = useSWR(`${backUrl}/api/users`, fetcher);
  const [showPost, setShowPost] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { mutateAsync: logout } = useLogout();
  const navigate = useNavigate();

  const onLogout = useCallback(async () => {
    try {
      await logout();
      navigate('/');
      mutate(false, false);
    } catch (error) {
      console.error('로그아웃 중 에러 발생:', error);
    }
  }, [mutate, navigate]);

  const onClickShowPost = useCallback(() => {
    setShowPost((prev) => !prev);
  }, []);

  const handleCloseShowProfile = useCallback(() => {
    setShowProfile(false);
  }, []);

  const handleToggleShowProfile = useCallback(() => {
    setShowProfile((prevShowProfile) => !prevShowProfile);
  }, []);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center justify-start">
            <button
              type="button"
              onClick={toggleSidebar}
              className="mr-2 inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <Link to="/" className="flex items-center">
              <img
                src="/favicon.png"
                className="h-10 w-10 mr-3 rounded-full bg-gray-500"
                alt="Blog Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                SCS's blog
              </span>
            </Link>
          </div>

          <div className="flex items-center md:order-2">
            {!userData ? (
              <button
                onClick={onClickShowPost}
                type="button"
                className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
              >
                <Link
                  to="/main/login"
                  className="text-white cursor-pointer p-2 hover:text-slate-500"
                >
                  Log in
                </Link>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleToggleShowProfile}
                className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                data-dropdown-toggle="user-dropdown"
              >
                <Avatar
                  name={userData?.name}
                  src={userData?.avatar_url}
                  size="30"
                  round
                  color="gray"
                  className="w-8 h-8 rounded-full"
                  alt="user photo"
                />
              </button>
            )}
            <DarkThemeToggle className="ml-2" />

            {/* <!-- Dropdown menu --> */}
            {userData && (
              <ProfileModal
                userData={userData}
                showProfile={showProfile}
                onLogout={onLogout}
                onClose={handleCloseShowProfile}
                id={userData.id}
              />
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default memo(Header);
