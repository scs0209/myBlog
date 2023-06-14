import React from "react";
import useSWR from "swr";
import { useCallback, useState } from "react";
import axios from "axios";
import fetcher from "../../utils/fetcher";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import ProfileModal from "../../Components/ProfileModal";

const backUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://port-0-server-p8xrq2mlfsc6kg2.sel3.cloudtype.app";
const Header = () => {
    const { data: userData, mutate } = useSWR(`${backUrl}/api/users`, fetcher);
    const [showPost, setShowPost] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [menuHidden, setMenuHidden] = useState(true);

    const onLogout = useCallback(() => {
      axios
        .post(`${backUrl}/api/users/logout`, null, {
          withCredentials: true,
        })
        .then(() => {
          mutate(false, false);
        });
    }, [mutate]);

    const onClickShowPost = useCallback(() => {
      setShowPost((prev) => !prev);
    }, []);

    const onClickShowProfile = useCallback(() => {
      setShowProfile((prev) => !prev);
    }, []);

    const toggleMainMenu = useCallback(() => {
      setMenuHidden((prev) => !prev);
    }, [])

    const onCloseProfileMenu = useCallback((e: any) => {
      e.stopPropagation();
      setShowProfile(false);
    }, []);

    console.log(userData)

  return (
    <nav className="bg-gray-600 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <img src="/favicon.png" className="h-8 mr-3" alt="Blog Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            SCS's blog
          </span>
        </Link>
        <div className="flex items-center md:order-2">
          {!userData ? (
            <button
              onClick={onClickShowPost}
              type="button"
              className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <Link
                to="/main/login"
                className="text-white cursor-pointer hover:text-slate-500"
              >
                Log in
              </Link>
            </button>
          ) : (
            <button
              type="button"
              onClick={onClickShowProfile}
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

          {/* <!-- Dropdown menu --> */}
          {userData && (
            <ProfileModal
              userData={userData}
              showProfile={showProfile}
              onLogout={onLogout}
            />
          )}
          <button
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-expanded="false"
            onClick={toggleMainMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ${
            menuHidden ? "hidden" : ""
          } w-full md:flex md:w-auto md:order-1`}
          id="mobile-menu-2"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              {userData?.role === "admin" && (
                <Link
                  to="/main/write"
                  className="block text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                >
                  <span className="p-2 bg-black rounded-lg hover:bg-slate-700">포스트 작성</span>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;