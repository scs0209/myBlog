import { useGetReply } from 'apis/reply';
import { useRepliesVisibilityContext } from 'contexts/repliesVisibilityContext';
import { VFC } from 'react';
import { useParams } from 'react-router';
import { useHandleReplyActions, useIsRepliesVisible } from 'store/repliesVisibilityStore';
import { Reply } from 'typings/db';

interface Props {
  toggleShow: () => void;
}

const CommentContent: VFC<Props> = ({ toggleShow }) => {
  const { id } = useParams<{ id: string }>();
  const { data: repliesData } = useGetReply(id);
  const isRepliesVisible = useIsRepliesVisible();
  const { handleRepliesClick } = useHandleReplyActions();
  const { comment } = useRepliesVisibilityContext();

  return (
    <>
      <p className="text-gray-500 dark:text-gray-400">{comment?.content}</p>
      <div className="flex items-center mt-4 space-x-4">
        <button
          type="button"
          onClick={toggleShow}
          className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
        >
          <svg
            aria-hidden="true"
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            ></path>
          </svg>
          답글
        </button>
        <button
          type="button"
          className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
          onClick={() => handleRepliesClick(comment?.id)}
        >
          {isRepliesVisible[comment?.id] ? '숨기기' : '보기'}{' '}
          {`(${repliesData?.filter((reply: Reply) => reply.CommentId === comment?.id).length})`}
        </button>
      </div>
    </>
  );
};

export default CommentContent;
