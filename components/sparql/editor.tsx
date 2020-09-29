import { useRef, useImperativeHandle, forwardRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Segment } from 'semantic-ui-react';
import SparqlEndpointInput from '@/components/sparql/endpoint-input';
import SparqlResultTable from '@/components/sparql/result-table';
import SparqlResultError from '@/components/sparql/result-error';
import SparqlForkButton from '@/components/sparql/fork-button';
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
  viewer?: boolean;
  queryId?: string;
  endpoint: string;
  query: string;
};

const SparqlEditor = forwardRef<Handler, Props>(
  ({ viewer, queryId, endpoint, query }, ref) => {
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

    const router = useRouter();

    const handleFork = () => {
      router.push({
        pathname: '/compose',
        query: {
          fork: queryId,
          endpoint: endpointRef.current!.inputRef.current!.value,
          query: editorInnerRef.current!.getValue(),
        },
      });
    };

    return (
      <>
        <Segment attached="top">
          <SparqlEndpointInput defaultValue={endpoint} ref={endpointRef} />
        </Segment>
        <Segment attached style={{ padding: '0', minHeight: '300px' }}>
          <SparqlEditorInner
            value={query}
            editorDidMount={(editor) => (editorInnerRef.current = editor)}
          />
        </Segment>
        <Segment clearing attached={result || error ? true : 'bottom'}>
          {viewer && <SparqlForkButton onClick={handleFork} />}
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
  }
);

export default SparqlEditor;
