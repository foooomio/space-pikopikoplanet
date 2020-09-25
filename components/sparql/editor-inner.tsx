import React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/sparql/sparql';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import type { Editor } from 'codemirror';

type Props = {
  value: string;
  editorDidMount: (editor: any) => void;
};

const SparqlEditorInner: React.FC<Props> = ({ value, editorDidMount }) => {
  const options = {
    mode: 'sparql',
    lineWrapping: true,
    lineNumbers: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    extraKeys: {
      Tab: (cm: Editor) => cm.execCommand('indentMore'),
    },
  };

  return (
    <CodeMirror
      value={value}
      options={options}
      editorDidMount={editorDidMount}
    />
  );
};

export default SparqlEditorInner;
