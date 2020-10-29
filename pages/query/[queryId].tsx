import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import QueryViewer from '@/components/query/viewer';
import { fetchQuery } from '@/lib/database';
import type { GetServerSideProps } from 'next';
import type { Query } from '@/lib/types';

const QueryPage = (query: Query) => {
  return (
    <Layout>
      <Head
        subtitle={`${query.title} by ${query.authorName}`}
        type="article"
        image={`/api/og-image?id=${query.queryId}`}
        card="summary_large_image"
      />
      <QueryViewer {...query} />
    </Layout>
  );
};

export default QueryPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryId = context.params!.queryId as string;
  const query = await fetchQuery(queryId);

  if (!query) {
    return { notFound: true };
  }

  return {
    props: query,
  };
};
