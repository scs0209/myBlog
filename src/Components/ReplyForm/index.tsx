import { Textarea } from "flowbite-react";
import React, { ChangeEvent, VFC } from "react"
import { Comment } from "../../typings/db";

interface Props {
  comment: Comment
  replyContent: string;
  onChangeReplyContent: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onSubmit: (commentId: number | null) => void;
  onCancel: () => void;
}

const ReplyForm: VFC<Props> = ({ replyContent, onChangeReplyContent, onSubmit, onCancel, comment }) => {
  return (
    <form className="mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
          Reply
        </h2>
      </div>
      <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <label className="sr-only">Your comment</label>
        <Textarea
          name="content"
          id="content"
          onChange={onChangeReplyContent}
          value={replyContent}
          placeholder="댓글을 입력해주세요."
          rows={3}
          required
        />
      </div>
      <button
        type="submit"
        onClick={() => onSubmit(comment.id)}
        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
      >
        완료
      </button>
      <button
        className="ml-3 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        onClick={onCancel}
      >
        취소
      </button>
    </form>
  );
}

export default ReplyForm