import { useRef, useImperativeHandle, forwardRef } from 'react';
import dynamic from 'next/dynamic';
import { Segment } from 'semantic-ui-react';
import SparqlEndpointInput from '@/components/sparql/endpoint-input';
import SparqlResultTable from '@/components/sparql/result-table';
import SparqlResultError from '@/components/sparql/result-error';
import SparqlQueryButton from '@/components/sparql/query-button';
import { useQuery } from '@/hooks/use-query';
import type { InputWithRef } from '@/lib/types';
import type { Editor } from 'codemirror';

const SparqlEditorInner = dynamic(
  () => import('@/components/sparql/editor-inner'),
  { ssr: false }
);

type Handler = {
  endpoint: () => string;
  query: () => string;
};

type Props = {
  endpoint: string;
  query: string;
};

const SparqlEditor = forwardRef<Handler, Props>(({ endpoint, query }, ref) => {
  const endpointRef = useRef<InputWithRef>(null);
  const editorInnerRef = useRef<Editor | null>(null);

  const [{ result, loading, error }, handleQuery] = useQuery(
    () => endpointRef.current!.inputRef.current!.value,
    () => editorInnerRef.current!.getValue()
  );

  useImperativeHandle(ref, () => ({
    endpoint: () => endpointRef.current!.inputRef.current!.value,
    query: () => editorInnerRef.current!.getValue(),
  }));

  return (
    <>
      <Segment attached="top">
        <SparqlEndpointInput defaultValue={endpoint} ref={endpointRef} />
      </Segment>
      <Segment attached style={{ padding: '0' }}>
        <SparqlEditorInner
          value={query}
          editorDidMount={(editor) => (editorInnerRef.current = editor)}
        />
      </Segment>
      <Segment clearing attached={result || error ? true : 'bottom'}>
        <SparqlQueryButton
          floated="right"
          onClick={handleQuery}
          loading={loading}
        />
      </Segment>
      <SparqlResultTable result={result} />
      <SparqlResultError error={error} />
    </>
  );
});

export default SparqlEditor;
