import { useMemo } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/mode/sparql/sparql';
import 'codemirror/addon/runmode/runmode';

export default function SparqlHighlighter({ value }) {
  const highlighted = useMemo(() => {
    const elements = [];

    CodeMirror.runMode(value, 'sparql', (text, style) => {
      elements.push(
        <span className={style ? `cm-${style}` : null} key={elements.length}>
          {text}
        </span>
      );
    });

    return elements;
  }, [value]);

  return <pre className="cm-s-default">{highlighted}</pre>;
}
