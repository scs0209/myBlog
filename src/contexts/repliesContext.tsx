/* eslint-disable */
import React, { createContext, FC, ReactNode, useContext, useState } from 'react';

interface RepliesState {
  isRepliesVisible: { [commentId: number]: boolean };
  show: boolean;
  editId: number | null;
  editContent: string;
  onChangeEditContent: () => void;
}

const initialState: RepliesState = {
  isRepliesVisible: {},
  show: false,
  editId: null,
  editContent: '',
  onChangeEditContent: () => {},
};

const RepliesContext = createContext<{
  state: RepliesState;
  setState: React.Dispatch<React.SetStateAction<RepliesState>>;
  onChangeEditContent: (value: string) => void;
}>({
  state: initialState,
  setState: () => {},
  onChangeEditContent: () => {},
});

interface Props {
  children: ReactNode;
}

const RepliesProvider: FC<Props> = ({ children }) => {
  const [state, setState] = useState<RepliesState>(initialState);

  const onChangeEditContent = (value: string) => {
    setState((prev) => ({ ...prev, editContent: value }));
  };

  return (
    <RepliesContext.Provider value={{ state, setState, onChangeEditContent }}>
      {children}
    </RepliesContext.Provider>
  );
};

const useRepliesContext = () => useContext(RepliesContext);

export { RepliesProvider, useRepliesContext };
