import { useCallback, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
  handleImageUpload: () => void;
}

const QuillEditor = ({ value, onChange, handleImageUpload }: Props) => {
  const quillRef = useRef<ReactQuill>(null);

  const onChangeContents = useCallback(
    (content: string, delta: any, source: string, editor: any) => {
      onChange(content);
    },
    [onChange]
  );

  return (
    <div style={{ width:"91%" }}>
      <ReactQuill
        placeholder="내용을 입력하세요"
        value={value}
        onChange={onChangeContents}
        modules={{
          toolbar: {
            container: [
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              ["clean"],
            ],
            handlers: {
              image: handleImageUpload,
            },
          },
        }}
        ref={quillRef}
      />
    </div>
  );
};

export default QuillEditor;
