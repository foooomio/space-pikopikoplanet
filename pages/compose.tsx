import { useRouter } from 'next/router';
import { Segment, Header } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import ComposeForm from '@/components/compose-form';
import { useSignInRequired } from '@/hooks/use-sign-in-required';

const ComposePage = () => {
  useSignInRequired();

  const router = useRouter();

  const { edit, fork, endpoint, query } = router.query;

  if (
    Array.isArray(edit) ||
    Array.isArray(fork) ||
    Array.isArray(endpoint) ||
    Array.isArray(query) ||
    (edit && fork) ||
    (fork && (!endpoint || !query))
  ) {
    router.replace('/404');
    return null;
  }

  const pageTitle = edit ? 'SPARQLクエリ編集' : 'SPARQLクエリ新規作成';

  return (
    <Layout>
      <Head subtitle={pageTitle} />

      <Segment clearing>
        <Header as="h2">{pageTitle}</Header>

        <ComposeForm
          editId={edit}
          forkId={fork}
          endpoint={endpoint}
          query={query}
        />
      </Segment>
    </Layout>
  );
};

export default ComposePage;
