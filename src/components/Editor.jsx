import React, { useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
// import { autocompletion } from '@codemirror/autocomplete';

const Editor = () => {
  return (
    // <textarea id="realtimeEditor">
    <CodeMirror value="" lang="javascript" height="100vh" theme={vscodeDark} />
    // </textarea>
  );
};

export default Editor;
