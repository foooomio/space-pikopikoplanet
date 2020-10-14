import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/sparql/sparql';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import type { Editor, EditorChange } from 'codemirror';

type Props = {
  value: string;
  onChange: (editor: Editor, data: EditorChange, value: string) => void;
};

const SparqlEditorInner = ({ value, onChange }: Props) => {
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

  return <CodeMirror value={value} options={options} onChange={onChange} />;
};

export default SparqlEditorInner;
