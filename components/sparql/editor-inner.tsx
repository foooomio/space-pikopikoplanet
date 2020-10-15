import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/sparql/sparql';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import { autocomplete, getPrefixes } from '@/lib/autocomplete';
import type { Editor, EditorChange } from 'codemirror';

type Props = {
  value: string;
  onBeforeChange: (editor: Editor, data: EditorChange, value: string) => void;
};

const SparqlEditorInner = ({ value, onBeforeChange }: Props) => {
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
      onBeforeChange={onBeforeChange}
      onChange={autocomplete}
      onFocus={getPrefixes}
    />
  );
};

export default SparqlEditorInner;
