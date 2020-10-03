import { useRouter } from 'next/router';
import { Segment, Header } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import ComposeForm from '@/components/compose-form';
import { useUser } from '@/hooks/use-user';
import type { GetServerSideProps } from 'next';

type Props = {
  editId: string | null;
  forkId: string | null;
  endpoint: string | null;
  query: string | null;
};

const ComposePage = ({ editId, forkId, endpoint, query }: Props) => {
  const [user, loading] = useUser();
  const router = useRouter();

  if (typeof window !== 'undefined' && !loading && !user) {
    router.replace('/sign-in');
  }

  const pageTitle = editId ? 'SPARQLクエリ編集' : 'SPARQLクエリ新規作成';

  return (
    <Layout>
      <Head subtitle={pageTitle} />

      <Segment clearing>
        <Header as="h2">{pageTitle}</Header>

        <ComposeForm
          editId={editId}
          forkId={forkId}
          endpoint={endpoint}
          query={query}
        />
      </Segment>
    </Layout>
  );
};

export default ComposePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { edit, fork, endpoint, query } = context.query;

  if (
    Array.isArray(edit) ||
    Array.isArray(fork) ||
    Array.isArray(endpoint) ||
    Array.isArray(query) ||
    (edit && fork) ||
    (fork && (!endpoint || !query))
  ) {
    context.res.writeHead(307, { Location: '/404' }).end();
    return { props: {} };
  }

  return {
    props: {
      editId: edit ?? null,
      forkId: fork ?? null,
      endpoint: endpoint ?? null,
      query: query ?? null,
    },
  };
};
