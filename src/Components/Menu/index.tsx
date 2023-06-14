import React, { FC, useCallback } from "react";
import { CloseModalButton, CreateMenu } from "./styles"

interface Props {
  children: React.ReactNode;
  show: boolean;
  onCloseModal: (e: any) => void;
  closeButton?: boolean;
  style?: object;
}

const Menu: FC<Props> = ({
  children,
  show,
  onCloseModal,
  style,
  closeButton,
}) => {
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation();
  }, []);

  if (!show) return null;

  return (
    <div
      className="z-50 hidden my-4 text-base list-none bg-gray-700 divide-y divide-gray-600 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
      id="user-dropdown"
      onClick={onCloseModal}
    >
      <div onClick={stopPropagation} style={style}>
        {closeButton && (
          <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
        )}
        {children}
      </div>
    </div>
  );
};

Menu.defaultProps = {
  closeButton: true,
};

export default Menu;