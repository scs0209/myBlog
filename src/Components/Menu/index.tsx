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
    <CreateMenu onClick={onCloseModal}>
      <div onClick={stopPropagation} style={style}>
        {closeButton && (
          <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
        )}
        {children}
      </div>
    </CreateMenu>
  );
};

Menu.defaultProps = {
  closeButton: true,
};

export default Menu;