import { Textarea } from "flowbite-react";
import React, { ChangeEvent, VFC } from "react"

interface Props {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  onCancel: () => void
}

const CommentEdit: VFC<Props> = ({ value, onChange, onSubmit, onCancel}) => {
  return (
    <form className="mb-6">
      <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <label className="sr-only">Your comment</label>
        <Textarea
          value={value}
          onChange={onChange}
          placeholder="댓글을 입력해주세요."
          style={{ resize: "none" }}
          rows={3}
          required
        />
      </div>
      <button
        type="button"
        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        onClick={onCancel}
      >
        취소
      </button>
      <button
        type="submit"
        className="ml-2 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        onClick={onSubmit}
      >
        저장
      </button>
    </form>
  );
}

export default CommentEdit