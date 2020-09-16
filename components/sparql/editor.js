import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/sparql/sparql';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';

export default function SparqlEditor({ value, editorDidMount }) {
  const options = {
    mode: 'sparql',
    lineWrapping: true,
    lineNumbers: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    extraKeys: {
      Tab: (cm) => cm.execCommand('indentMore'),
    },
  };

  return (
    <CodeMirror
      value={value}
      options={options}
      editorDidMount={editorDidMount}
    />
  );
}
