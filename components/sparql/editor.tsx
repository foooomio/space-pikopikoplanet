import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Segment } from 'semantic-ui-react';
import SparqlEndpointInput from '@/components/sparql/endpoint-input';
import SparqlResultTable from '@/components/sparql/result-table';
import SparqlResultError from '@/components/sparql/result-error';
import SparqlForkButton from '@/components/sparql/fork-button';
import SparqlQueryButton from '@/components/sparql/query-button';
import { useQuery } from '@/hooks/use-query';

const SparqlEditorInner = dynamic(
  () => import('@/components/sparql/editor-inner'),
  { ssr: false }
);

type Props = {
  viewer?: boolean;
  queryId?: string;
  endpoint: string;
  query: string;
  onEndpointChange: (value: string) => void;
  onQueryChange: (value: string) => void;
};

const SparqlEditor = ({
  viewer,
  queryId,
  endpoint,
  query,
  onEndpointChange,
  onQueryChange,
}: Props) => {
  const { result, loading, error, handleQuery } = useQuery(endpoint, query);

  const router = useRouter();

  const handleFork = () => {
    router.push({
      pathname: '/compose',
      query: { fork: queryId, endpoint, query },
    });
  };

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
          onChange={(editor, data, value) => onQueryChange(value)}
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
};

export default SparqlEditor;
