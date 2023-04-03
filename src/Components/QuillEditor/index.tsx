import { VFC, useCallback, useEffect, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import {ImageResize} from "quill-image-resize-module-ts";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

Quill.register("modules/imageResize", ImageResize);

// highlight.js 등록
const CodeBlock = Quill.import("formats/code-block");
CodeBlock.tagName = "PRE"; // 태그명 변경
CodeBlock.className = "ql-syntax"; // 클래스명 추가
Quill.register(CodeBlock, true);


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

const modules = useMemo(
  () => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image", "code-block"],
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
    syntax: {
      highlight: (text: string) => hljs.highlightAuto(text).value, // 하이라이팅 함수 설정
    },
  }),
  [handleImageUpload]
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
        modules={modules}
        ref={quillRef}
      />
    </div>
  );
};

export default QuillEditor;
