import ReplyComp from 'Components/Reply';
import React, { useCallback, useState, VFC } from 'react';

import { Comment, Reply } from '../../typings/db';
import ReplyForm from '../Reply/ReplyForm';
import CommentItem from './CommentItem';

interface Props {
  comments: Comment[];
  replies: Reply[];
  onDelete: (commentId: number) => void;
  onEdit: (commentId: number, content: string) => void;
  onReply: (commentId: number, content: string) => void;
  onDeleteReply: (commentId: number, replyId: number) => void;
  onReplyEdit: (commentId: number, replyId: number, content: string) => void;
}

const CommentList: VFC<Props> = ({
  comments,
  onDelete,
  onEdit,
  onReply,
  onReplyEdit,
  onDeleteReply,
  replies,
}) => {
  const [isRepliesVisible, setIsRepliesVisible] = useState<{ [commentId: number]: boolean }>({});
  const [show, setShow] = useState(false);

  const toggleShow = useCallback(() => {
    setShow((prev) => !prev);
  }, []);

  return (
    <>
      {comments?.map((comment) => (
        <div key={comment?.id}>
          <CommentItem
            comment={comment}
            replies={replies}
            onDelete={onDelete}
            onEdit={onEdit}
            onReply={onReply}
            onDeleteReply={onDeleteReply}
            onReplyEdit={onReplyEdit}
            toggleShow={toggleShow}
            isRepliesVisible={isRepliesVisible}
            setIsRepliesVisible={setIsRepliesVisible}
          />

          {/* 답글 */}
          <article className="p-6 mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-800 dark:text-white">
            {isRepliesVisible[comment?.id!] && (
              <>
                {replies
                  ?.filter((reply) => reply.CommentId === comment?.id)
                  .map((reply) => (
                    <ReplyComp
                      key={reply.id}
                      reply={reply}
                      onEdit={onReplyEdit}
                      onDelete={onDeleteReply}
                    />
                  ))}
              </>
            )}
            {show && <ReplyForm comment={comment} onReply={onReply} />}
          </article>
        </div>
      ))}
    </>
  );
};

export default CommentList;
