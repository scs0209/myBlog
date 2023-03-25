import React, { ChangeEvent, VFC } from "react";
import { ReplyCancelButton, ReplyEditWrapper, ReplySaveButton } from "./styles";

interface Props {
  value: string;
  onCancel: () => void;
  onSave: () => void;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

const ReplyEdit: VFC<Props> = ({ onCancel, onSave, value, onChange }) => {
  return (
    <ReplyEditWrapper>
      <textarea
        value={value}
        onChange={onChange}
        style={{ resize: "none", outline: "none" }}
      />
      <ReplyCancelButton onClick={onCancel}>취소</ReplyCancelButton>
      <ReplySaveButton onClick={onSave}>저장</ReplySaveButton>
    </ReplyEditWrapper>
  );
}

export default ReplyEdit