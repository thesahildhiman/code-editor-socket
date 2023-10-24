import React, { useEffect, useRef } from "react";
import CodeMirror, { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
// import { autocompletion } from '@codemirror/autocomplete';

const Editor = () => {
  return (
    // <textarea id="realtimeEditor">
    <CodeMirror
      value=""
      lang="javascript"
      height="100vh"
      theme={vscodeDark}
      extensions={[javascript({ jsx: true })]}
      onChange={(editor, data, value) => {
        console.log("---on change--", editor);
      }}
    />
    // </textarea>
  );
};

export default Editor;
