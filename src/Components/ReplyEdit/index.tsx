import React, { ChangeEvent, VFC } from "react";

interface Props {
  value: string;
  onCancel: () => void;
  onSave: () => void;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

const ReplyEdit: VFC<Props> = ({ onCancel, onSave, value, onChange }) => {
  return(
    <div>
      <textarea value={value} onChange={onChange} />
      <button onClick={onCancel}>취소</button>
      <button onClick={onSave}>저장</button>
    </div>
  )
}

export default ReplyEdit