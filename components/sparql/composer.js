import { useRef, useImperativeHandle, forwardRef } from 'react';
import dynamic from 'next/dynamic';
import { Segment } from 'semantic-ui-react';
import SparqlEndpointInput from '@/components/sparql/endpoint-input';
import SparqlResultTable from '@/components/sparql/result-table';
import SparqlResultError from '@/components/sparql/result-error';
import SparqlQueryButton from '@/components/sparql/query-button';
import { useQuery } from '@/lib/use-query';

const SparqlEditor = dynamic(() => import('./editor'), {
  ssr: false,
});

const SparqlComposer = forwardRef(({ endpoint, query }, ref) => {
  const endpointRef = useRef(null);
  const editor = useRef(null);

  const [{ result, loading, error }, handleQuery] = useQuery(
    () => endpointRef.current.inputRef.current.value,
    () => editor.current.getValue()
  );

  useImperativeHandle(ref, () => ({
    endpoint: () => endpointRef.current.inputRef.current.value,
    query: () => editor.current.getValue(),
  }));

  return (
    <>
      <Segment attached="top">
        <SparqlEndpointInput defaultValue={endpoint} ref={endpointRef} />
      </Segment>
      <Segment attached style={{ padding: '0' }}>
        <SparqlEditor
          value={query}
          editorDidMount={(e) => (editor.current = e)}
        />
      </Segment>
      <SparqlResultTable result={result} />
      <SparqlResultError error={error} />
      <Segment clearing attached="bottom">
        <SparqlQueryButton
          floated="right"
          onClick={handleQuery}
          loading={loading}
        />
      </Segment>
    </>
  );
});

export default SparqlComposer;
