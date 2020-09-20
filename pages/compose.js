import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Segment, Header } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import ComposeForm from '@/components/compose-form';
import { useUser } from '@/lib/user-context';
import { fetchQuery } from '@/lib/database';

export default function ComposePage() {
  const [user, loading] = useUser();
  const router = useRouter();

  if (typeof window !== 'undefined' && !loading && !user) {
    router.replace('/sign-in');
  }

  const queryId = router.query.edit;

  const [query, setQuery] = useState({
    queryId: null,
    authorUid: null,
    title: '',
    endpoint: '',
    query: '',
    tags: [],
    createdAt: null,
  });

  useEffect(() => {
    if (!queryId) return;

    fetchQuery(queryId).then((data) => {
      if (!data) {
        router.replace('/404');
      }
      setQuery(data);
    });
  }, [queryId]);

  const pageTitle = queryId ? 'SPARQLクエリ編集' : 'SPARQLクエリ新規作成';

  return (
    <Layout>
      <Head subtitle={pageTitle} />

      <Segment clearing>
        <Header as="h2">{pageTitle}</Header>

        <ComposeForm {...query} />
      </Segment>
    </Layout>
  );
}
