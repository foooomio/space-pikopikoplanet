import { useState, useEffect } from 'react';
import SparqlEditor from '@/components/sparql/editor';

type Props = {
  queryId: string;
  endpoint: string;
  query: string;
};

const SparqlViewer = ({ queryId, endpoint, query }: Props) => {
  const [form, setForm] = useState({ endpoint, query });

  useEffect(() => {
    setForm({ endpoint, query });
  }, [endpoint, query]);

  return (
    <SparqlEditor
      viewer={true}
      queryId={queryId}
      endpoint={form.endpoint}
      query={form.query}
      onEndpointChange={(value) => setForm({ ...form, endpoint: value })}
      onQueryChange={(value) => setForm({ ...form, query: value })}
    />
  );
};

export default SparqlViewer;
