import useSWR from 'swr';
import { Loader } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import QueryViewer from '@/components/query/viewer';
import { fetchQuery } from '@/lib/database';
import { isBot } from '@/lib/util';
import type { GetServerSideProps } from 'next';
import type { Query } from '@/lib/types';

type Props = {
  queryId: string;
  initialData?: Query;
};

const QueryPage = ({ queryId, initialData }: Props) => {
  const { data, error } = useSWR(
    ['query', queryId],
    () => fetchQuery(queryId),
    { initialData }
  );

  if (error) {
    console.error(error);
  }

  return (
    <Layout>
      {data ? (
        <>
          <Head
            subtitle={`${data.title} by ${data.authorName}`}
            type="article"
            image={`/api/og-image?id=${queryId}`}
            card="summary_large_image"
          />
          <QueryViewer {...data} />
        </>
      ) : (
        <Loader active inline="centered" size="massive" />
      )}
    </Layout>
  );
};

export default QueryPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryId = context.params!.queryId as string;

  if (isBot(context.req.headers['user-agent'] ?? '')) {
    return {
      props: {
        queryId,
        initialData: await fetchQuery(queryId),
      },
    };
  }

  return {
    props: {
      queryId,
    },
  };
};
