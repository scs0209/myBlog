import { FC, ReactNode } from "react";

interface Props {
  type: "button" | "submit" | "reset";
  onClick: () => void;
  children: ReactNode;
}

const CategoryButton: FC<Props> = ({ type, onClick, children }) => {

  return (
    <button
      type={type}
      onClick={onClick}
      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-xs px-1 py-1 text-center mr-2 mb-2"
    >
      {children}
    </button>
  );
};

export default CategoryButton;
