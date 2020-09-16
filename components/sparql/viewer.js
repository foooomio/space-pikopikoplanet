import dynamic from 'next/dynamic';
import { Segment } from 'semantic-ui-react';
import SparqlEndpointInput from '@/components/sparql/endpoint-input';
import SparqlResultTable from '@/components/sparql/result-table';
import SparqlResultError from '@/components/sparql/result-error';
import SparqlQueryButton from '@/components/sparql/query-button';
import { useQuery } from '@/lib/use-query';

const SparqlHighlighter = dynamic(() => import('./highlighter'), {
  ssr: false,
});

export default function SparqlViewer({ endpoint, query }) {
  const [{ result, loading, error }, handleQuery] = useQuery(
    () => endpoint,
    () => query
  );

  return (
    <>
      <Segment attached="top">
        <SparqlEndpointInput readOnly value={endpoint} />
      </Segment>
      <Segment attached>
        <SparqlHighlighter value={query} />
      </Segment>
      <SparqlResultTable result={result} />
      <SparqlResultError error={error} />
      <Segment clearing attached="bottom">
        <SparqlQueryButton
          onClick={handleQuery}
          floated="right"
          loading={loading}
        />
      </Segment>
    </>
  );
}
