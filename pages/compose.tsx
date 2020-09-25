import { useRouter } from 'next/router';
import { Segment, Header } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import ComposeForm from '@/components/compose-form';
import { useUser } from '@/hooks/use-user';
import type { GetServerSideProps } from 'next';

type Props = {
  editId: string;
};

const ComposePage = ({ editId }: Props) => {
  const [user, loading] = useUser();
  const router = useRouter();

  if (typeof window !== 'undefined' && !loading && !user) {
    router.replace('/sign-in');
  }

  const pageTitle = router.query.edit
    ? 'SPARQLクエリ編集'
    : 'SPARQLクエリ新規作成';

  return (
    <Layout>
      <Head subtitle={pageTitle} />

      <Segment clearing>
        <Header as="h2">{pageTitle}</Header>

        <ComposeForm editId={editId} />
      </Segment>
    </Layout>
  );
};

export default ComposePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      editId: context.query.edit ?? null,
    },
  };
};
