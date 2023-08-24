import React, { createContext, useContext } from 'react';
import { Comment } from 'typings/db';

interface RepliesVisibilityContextValue {
  comment: Comment;
}

const RepliesVisibilityContext = createContext<RepliesVisibilityContextValue | undefined>(
  undefined,
);

export const useRepliesVisibilityContext = () => {
  const context = useContext(RepliesVisibilityContext);

  if (!context) {
    throw new Error('RepliesVisibilityContext is not provided');
  }

  return context;
};

interface RepliesVisibilityProviderProps {
  comment: Comment;
  children: React.ReactNode;
}

export const RepliesVisibilityProvider: React.FC<RepliesVisibilityProviderProps> = ({
  children,
  comment,
}) => {
  return (
    <RepliesVisibilityContext.Provider value={{ comment }}>
      {children}
    </RepliesVisibilityContext.Provider>
  );
};
