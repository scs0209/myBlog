import React, { VFC, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { User } from "../../typings/db";

interface Props {
  userData: User;
  showProfile: boolean;
  onLogout: () => void;
  onClose: () => void;
  id: number;
}

const ProfileModal: VFC<Props> = ({ userData, showProfile, onLogout, onClose, id }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // 바깥쪽 영역 클릭 시 모달이 닫히는 함수
  // 바깥쪽 영역 클릭 시 모달이 닫히는 함수
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setTimeout(() => {
        onClose();
      }, 0);
    }
  }, []);

  // showProfile 상태가 변경될 때마다 이벤트 리스너를 업데이트합니다.
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  if (!showProfile) {
    return null;
  }

  return (
    <div
      className="absolute z-50 top-10 right-10 my-4 text-base list-none bg-gray-200 divide-y divide-gray-600 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
      ref={modalRef}
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
          {userData?.role === "admin" && (
            <Link
              to="/main/write"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              포스트 작성
            </Link>
          )}
        </li>
        <li>
          <Link
            to={`/main/my-page/${id}`}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            My Page
          </Link>
        </li>
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
