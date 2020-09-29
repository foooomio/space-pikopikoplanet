import { useRouter } from 'next/router';
import { Segment, Header } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import ComposeForm from '@/components/compose-form';
import { useUser } from '@/hooks/use-user';
import type { GetServerSideProps } from 'next';

type Props = {
  editId: string | null;
  fork: {
    queryId: string;
    endpoint: string;
    query: string;
  } | null;
};

const ComposePage = ({ editId, fork }: Props) => {
  const [user, loading] = useUser();
  const router = useRouter();

  if (typeof window !== 'undefined' && !loading && !user) {
    router.replace('/sign-in');
  }

  if (typeof window !== 'undefined' && editId && fork) {
    location.href = '/404';
  }

  const pageTitle = editId ? 'SPARQLクエリ編集' : 'SPARQLクエリ新規作成';

  return (
    <Layout>
      <Head subtitle={pageTitle} />

      <Segment clearing>
        <Header as="h2">{pageTitle}</Header>

        <ComposeForm editId={editId} fork={fork} />
      </Segment>
    </Layout>
  );
};

export default ComposePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { edit, fork, endpoint, query } = context.query;
  return {
    props: {
      editId: edit ?? null,
      fork:
        fork && endpoint && query ? { queryId: fork, endpoint, query } : null,
    },
  };
};
