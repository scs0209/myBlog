/* eslint-disable */
import { DarkThemeToggle } from 'flowbite-react';
import React, { memo, useCallback, useState } from 'react';
import Avatar from 'react-avatar';
import { Link, useNavigate } from 'react-router-dom';

import ProfileModal from '../ProfileModal';
import { useLogout, useUser } from 'apis/auth';
import MenuSVG from 'Components/Icons/MenuSVG';

const Header = () => {
  const { data: userData, isError } = useUser();
  const [showPost, setShowPost] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { mutateAsync: logout } = useLogout();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate('/');
  };

  const onClickShowPost = useCallback(() => {
    setShowPost((prev) => !prev);
  }, []);

  const handleCloseShowProfile = useCallback(() => {
    setShowProfile(false);
  }, []);

  const handleToggleShowProfile = useCallback(() => {
    setShowProfile((prevShowProfile) => !prevShowProfile);
  }, []);

  const handleGoCategoryPage = () => {
    navigate('/main/side-bar');
  };

  return (
    <>
      <nav className="fixed top-0 z-50 min-w-[345px] w-full bg-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-wrap items-center justify-between p-4 mx-auto">
          <Link to="/" className="flex items-center">
            <img
              src="/favicon.png"
              className="w-10 h-10 mr-3 bg-gray-500 rounded-full"
              alt="Blog Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              SCS's blog
            </span>
          </Link>

          <div className="flex items-center md:order-2">
            {!userData ? (
              <button
                onClick={onClickShowPost}
                type="button"
                className="hidden sm:flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
              >
                <Link
                  to="/main/login"
                  className="p-2 text-white cursor-pointer hover:text-slate-500"
                >
                  Log in
                </Link>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleToggleShowProfile}
                className="hidden sm:flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
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
