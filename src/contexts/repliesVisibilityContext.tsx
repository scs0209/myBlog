import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Comment } from 'typings/db';

interface RepliesVisibilityContextValue {
  comment: Comment;
  isRepliesVisible: { [commentId: number]: boolean };
  handleRepliesClick: (commentId: number) => void;
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
  const [isRepliesVisible, setIsRepliesVisible] = useState<{ [commentId: number]: boolean }>({});

  const handleRepliesClick = useCallback((commentId: number) => {
    setIsRepliesVisible((prev) => {
      return {
        ...prev,
        [commentId]: !prev[commentId],
      };
    });
  }, []);

  const value = useMemo(
    () => ({ isRepliesVisible, handleRepliesClick }),
    [isRepliesVisible, handleRepliesClick],
  );

  return (
    <RepliesVisibilityContext.Provider value={{ ...value, comment }}>
      {children}
    </RepliesVisibilityContext.Provider>
  );
};
