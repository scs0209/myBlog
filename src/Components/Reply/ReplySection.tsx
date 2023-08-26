import { useGetReply } from 'apis/reply';
import { useRepliesVisibilityContext } from 'contexts/repliesVisibilityContext';
import { VFC } from 'react';
import { useParams } from 'react-router';
import useRepliesVisibilityStore from 'store/repliesVisibilityStore';
import { Reply } from 'typings/db';

import ReplyComp from '.';
import ReplyForm from './ReplyForm';

interface Props {
  show: boolean;
}

const ReplySection: VFC<Props> = ({ show }) => {
  const { id } = useParams<{ id: string }>();
  const { data: repliesData } = useGetReply(id);
  const { isRepliesVisible } = useRepliesVisibilityStore();
  const { comment } = useRepliesVisibilityContext();

  return (
    <article className="p-6 mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-800 dark:text-white">
      {show && <ReplyForm />}
      {isRepliesVisible[comment?.id] && (
        <>
          {repliesData
            ?.filter((reply: Reply) => reply.CommentId === comment?.id)
            .map((reply: Reply) => (
              <ReplyComp key={reply.id} reply={reply} />
            ))}
        </>
      )}
    </article>
  );
};

export default ReplySection;
