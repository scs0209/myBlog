import { useCallback, useState } from 'react';

const useRepliesVisible = () => {
  const [isRepliesVisible, setIsRepliesVisible] = useState<{ [commentId: number]: boolean }>({});

  const handleRepliesClick = useCallback((commentId: number) => {
    setIsRepliesVisible((prev) => {
      return {
        ...prev,
        [commentId]: !prev[commentId],
      };
    });
  }, []);

  return [isRepliesVisible, handleRepliesClick];
};

export default useRepliesVisible;
