import { VFC, useCallback, useEffect, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import {ImageResize} from "quill-image-resize-module-ts";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { QuillEditorWrapper } from "./styles";
import axios from "axios";

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

const backUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://port-0-server-p8xrq2mlfsc6kg2.sel3.cloudtype.app";
const QuillEditor:VFC<Props> = ({ value, onChange, handleImageUpload, quillRef }) => {
  
  const onChangeContents = useCallback(
    (content: string, delta: any, source: string, editor: any) => {
      onChange(content);
    },
    [onChange]
  );

  const handleImagePaste = (event: any, quill: any, quillRef: any) => {
    const clipboardData = event.clipboardData;
    const file = clipboardData.files[0];
    if (!file.type.includes("image/")) return;
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    axios
      .post(`${backUrl}/api/upload`, formData, {
        withCredentials: true,
      })
      .then((response) => {
        const imageUrl = response.data.url;
        const range = quill.getSelection();
        quillRef.current
          .getEditor()
          .insertEmbed(range.index, "image", imageUrl);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
      clipboard: {
        matchVisual: false,
        // 복사 붙여넣기 이벤트 핸들러 등록
        onPaste: (event: any, quill: any, quillRef: any) => {
          handleImagePaste(event, quill, quillRef);
        },
      },
    }),
    [handleImageUpload]
  );

  useEffect(() => {
    const editor = quillRef.current?.getEditor();
    if (editor) {
      editor.once("text-change", () => {
        editor.root.focus();
      });
    }
  }, [quillRef]);

  return (
    <QuillEditorWrapper>
      <ReactQuill
        placeholder="내용을 입력하세요"
        value={value}
        onChange={onChangeContents}
        modules={modules}
        ref={quillRef}
      />
    </QuillEditorWrapper>
  );
};

export default QuillEditor;
