import React, { VFC, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../typings/db';

interface Props {
  userData: User
  showProfile: boolean;
  onLogout: () => void;
}

const ProfileModal: VFC<Props>= ({ userData, showProfile, onLogout }) => {

  if (!showProfile) {
    return null;
  }
  

  return (
    <div
      className="absolute z-50 top-10 right-10 my-4 text-base list-none bg-gray-700 divide-y divide-gray-600 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
      id="user-dropdown"
    >
      <div className="px-4 py-3">
        <span className="block text-sm text-gray-900 dark:text-white">
          {userData.name}
        </span>
        <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
          {userData.email}
        </span>
      </div>
      <ul className="py-2" aria-labelledby="user-menu-button">
        <li>
          <Link
            to="/main/password"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            PW Change
          </Link>
        </li>
        <li>
          <span
            onClick={onLogout}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Sign out
          </span>
        </li>
      </ul>
    </div>
  );
};

export default ProfileModal;