import dynamic from 'next/dynamic';
import { Segment, Button } from 'semantic-ui-react';
import SparqlEndpointInput from '@/components/sparql/endpoint-input';
import SparqlResultTable from '@/components/sparql/result-table';
import SparqlResultError from '@/components/sparql/result-error';
import { useQuery } from '@/hooks/use-query';
import type { ReactNode } from 'react';

const SparqlEditorInner = dynamic(
  () => import('@/components/sparql/editor-inner'),
  { ssr: false }
);

type Props = {
  endpoint: string;
  query: string;
  onEndpointChange: (value: string) => void;
  onQueryChange: (value: string) => void;
  subButton?: ReactNode;
};

const SparqlEditor = ({
  endpoint,
  query,
  onEndpointChange,
  onQueryChange,
  subButton,
}: Props) => {
  const { result, loading, error, handleQuery } = useQuery(endpoint, query);

  return (
    <>
      <Segment attached="top">
        <SparqlEndpointInput
          value={endpoint}
          onChange={(e) => onEndpointChange(e.target.value)}
        />
      </Segment>
      <Segment attached style={{ padding: '0', minHeight: '300px' }}>
        <SparqlEditorInner
          value={query}
          onBeforeChange={(editor, data, value) => onQueryChange(value)}
        />
      </Segment>
      <Segment clearing attached={result || error ? true : 'bottom'}>
        {subButton}
        <Button
          positive
          content="Query"
          icon="play"
          labelPosition="left"
          floated="right"
          onClick={handleQuery}
          loading={loading}
        />
      </Segment>
      {result && <SparqlResultTable result={result} />}
      {error && <SparqlResultError error={error} />}
    </>
  );
};

export default SparqlEditor;
