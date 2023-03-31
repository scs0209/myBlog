import React, { VFC, useCallback, useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface Props {
  onChange: (editorState: EditorState) => void;
  editorState: EditorState;
}

const MyEditor: VFC<Props> = ({ onChange, editorState }) => {
  const onEditorStateChange = useCallback(
    (editorState: EditorState) => {
      onChange(editorState);
    },
    [onChange]
  );


return (
  <div style={{ width: "91%", border: "1px solid #ccc" }}>
    <Editor
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
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
          alt: { present: true, mandatory: false },
          defaultSize: {
            height: "auto",
            width: "100%",
          },
        },
      }}
    />
  </div>
);
    }
export default MyEditor
