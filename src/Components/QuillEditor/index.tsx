import { VFC, useCallback, useEffect, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import {ImageResize} from "quill-image-resize-module-ts";

Quill.register("modules/imageResize", ImageResize);

interface Props {
  value: string;
  onChange: (value: string) => void;
  handleImageUpload: () => void;
  quillRef: React.RefObject<ReactQuill>;
}

const QuillEditor:VFC<Props> = ({ value, onChange, handleImageUpload, quillRef }) => {
  const onChangeContents = useCallback(
    (content: string, delta: any, source: string, editor: any) => {
      onChange(content);
    },
    [onChange]
  );

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.focus();
    }
  }, [quillRef]);


  return (
    <div style={{ width: "91%" }}>
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
          imageResize: {
            modules: ["Resize", "DisplaySize"],
            displaySize: true,
            parchment: Quill.import("parchment"),
          },
        }}
        ref={quillRef}
      />
    </div>
  );
};

export default QuillEditor;
