import { useCommentContext } from 'contexts/commentContext';
import { useRepliesVisibilityContext } from 'contexts/repliesVisibilityContext';
import { VFC } from 'react';
import useRepliesVisibilityStore from 'store/repliesVisibilityStore';

import ReplyComp from '.';
import ReplyForm from './ReplyForm';

interface Props {
  show: boolean;
}

const ReplySection: VFC<Props> = ({ show }) => {
  const { repliesData } = useCommentContext();
  const { isRepliesVisible } = useRepliesVisibilityStore();
  const { comment } = useRepliesVisibilityContext();

  return (
    <article className="p-6 mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-800 dark:text-white">
      {show && <ReplyForm />}
      {isRepliesVisible[comment?.id] && (
        <>
          {repliesData
            ?.filter((reply) => reply.CommentId === comment?.id)
            .map((reply) => (
              <ReplyComp key={reply.id} reply={reply} />
            ))}
        </>
      )}
    </article>
  );
};

export default ReplySection;
