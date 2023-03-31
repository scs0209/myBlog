import React, { VFC, useCallback, useEffect, useRef, useState } from 'react';
import Draft, { EditorState, Editor as DraftEditor, Modifier, AtomicBlockUtils, Entity, DraftDecorator } from "draft-js";
import { Editor, SyntheticKeyboardEvent } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';

type HandleImageUploadReturnType = Promise<string>;

interface HandleImageUploadParams {
  file: File;
}

interface Props {
  onChange: (editorState: EditorState) => void;
  editorState: EditorState;
}

const MyEditor: VFC<Props> = ({ onChange, editorState }) => {
  const editorRef = useRef<Editor>(null);
  const [plugins, setPlugins] = useState<DraftDecorator[]>([]);
  const onEditorStateChange = useCallback(
    (editorState: EditorState) => {
      onChange(editorState);
    },
    [onChange]
  );

  // shift + enterKey 기본 동작 막고 enter하면 br태그 한거처럼 해줌
  const handleReturn = useCallback(
    (e: React.KeyboardEvent, editorState: EditorState): boolean => {
      if (e.shiftKey) {
        e.preventDefault();
        const contentState = editorState.getCurrentContent();
        const selectionState = editorState.getSelection();

        const newContentState = Modifier.insertText(
          contentState,
          selectionState,
          "\n"
        );

        const newEditorState = EditorState.push(
          editorState,
          newContentState,
          "insert-characters"
        );

        onChange(newEditorState);
        return true;
      }
      return false;
    },
    [editorState, onChange]
  );

  const handleImageUpload = useCallback(
    async (file: any) => {
      try {
        const formData = new FormData();
        formData.append("image", file);

        const response = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const imageUrl = response.data.url;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
          "image",
          "IMMUTABLE",
          { src: imageUrl }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = AtomicBlockUtils.insertAtomicBlock(
          editorState,
          entityKey,
          " "
        );

        onChange(newEditorState);
        return imageUrl;
      } catch (error) {
        console.error(error);
        throw new Error("이미지 업로드에 실패했습니다.");
      }
    },
    [editorState]
  );

  const handleFocus = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.focusEditor();
    }
  }, []);

  useEffect(() => {
    handleFocus();
  }, []);

  return (
    <div style={{ width: "91%", border: "1px solid #ccc" }}>
      <Editor
        ref={editorRef}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        handleReturn={handleReturn}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "fontFamily",
            "list",
            "textAlign",
            "link",
            "embedded",
            "emoji",
            "image",
            "remove",
            "history",
          ],
          inline: {
            inDropdown: true,
            options: [
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "monospace",
              "superscript",
              "subscript",
            ],
          },
          blockType: {
            inDropdown: true,
            options: [
              "Normal",
              "H1",
              "H2",
              "H3",
              "H4",
              "H5",
              "H6",
              "Blockquote",
              "Code",
            ],
          },
          fontSize: {
            options: [
              8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48, 60, 72,
              96,
            ],
          },
          fontFamily: {
            options: [
              "Arial",
              "Georgia",
              "Impact",
              "Tahoma",
              "Times New Roman",
              "Verdana",
              "Roboto",
              "Open Sans",
              "Montserrat",
              "Lato",
              "Indie Flower",
              "Pacifico",
              "Roboto Slab",
            ],
          },
          colorPicker: {
            colors: [
              "rgb(97,189,109)",
              "rgb(26,188,156)",
              "rgb(84,172,210)",
              "rgb(44,130,201)",
              "rgb(147,101,184)",
              "rgb(71,85,119)",
              "rgb(204,204,204)",
              "rgb(217,217,217)",
              "rgb(255,255,255)",
              "rgb(0,0,0)",
              "rgb(230,0,0)",
              "rgb(255,153,0)",
              "rgb(255,255,0)",
              "rgb(0,204,0)",
              "rgb(0,204,204)",
              "rgb(0,0,230)",
              "rgb(204,0,204)",
              "rgb(127,127,127)",
              "rgb(255,0,0)",
              "rgb(255,0,0)",
              "rgb(255,255,0)",
              "rgb(0,255,0)",
              "rgb(0,255,255)",
              "rgb(0,0,255)",
              "rgb(255,0,255)",
              "rgb(0,0,0)",
              "rgb(255,255,255)",
            ],
          },
          list: {
            inDropdown: true,
            options: ["unordered", "ordered"],
          },
          textAlign: {
            inDropdown: true,
            options: ["left", "center", "right", "justify"],
          },
          link: {
            inDropdown: true,
            options: ["link", "unlink"],
          },
          image: {
            uploadEnabled: true,
            uploadCallback: handleImageUpload, // 이미지 업로드 콜백 함수
            previewImage: true,
            alt: { present: true, mandatory: false },
            inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
          },
        }}
      />
    </div>
  );
};
export default MyEditor
