import styled from "@emotion/styled";

export const QuillEditorWrapper = styled.div`
  width: 91%;

  .ql-toolbar {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .ql-container {
    height: 400px;
    overflow: hidden;
  }
`;
