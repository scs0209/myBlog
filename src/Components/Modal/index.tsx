import React, { FC, useCallback } from "react";

interface Props{
  children: React.ReactNode;
  show: boolean;
  onCloseModal: (e: any) => void;
}

const Modal: FC<Props> = ({ children, show, onCloseModal }) => {
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  if(!show){
    return null;
  }

  return (
    <div
      className={`${show ? "flex" : "none"} fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      onClick={onCloseModal}
    >
      <div
        className="relative bg-white rounded-lg shadow dark:bg-gray-700"
        onClick={stopPropagation}
      >
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            onClick={onCloseModal}
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;