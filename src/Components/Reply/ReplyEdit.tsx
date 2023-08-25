/* eslint-disable */
import { Textarea } from 'flowbite-react';
import React, { ChangeEvent, VFC } from 'react';
import useReplyStore from 'store/replyStore';

interface Props {
  value: string;
  onSave: () => void;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const ReplyEdit: VFC<Props> = ({ onSave, value, onChange }) => {
  const { handleEditCancel } = useReplyStore();

  return (
    <form className="mb-6">
      <div className="px-4 py-2 mb-4 bg-white border border-gray-200 rounded-lg rounded-t-lg dark:bg-gray-800 dark:border-gray-700">
        <label className="sr-only">Your comment</label>
        <Textarea
          value={value}
          onChange={onChange}
          placeholder="댓글을 입력해주세요."
          style={{ resize: 'none' }}
          rows={3}
          required
        />
      </div>
      <button
        type="button"
        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        onClick={handleEditCancel}
      >
        취소
      </button>
      <button
        type="submit"
        className="ml-2 inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        onClick={onSave}
      >
        저장
      </button>
    </form>
  );
};

export default ReplyEdit;
