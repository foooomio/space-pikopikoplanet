import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Header, Divider, Card, Loader } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import QueryCard from '@/components/query/card';
import QueryNextButton from '@/components/query/next-button';
import { useUser } from '@/lib/user-context';
import { fetchQueryListLikedByUser } from '@/lib/database';
import { NUMBER_IN_QUERY_LIST } from '@/lib/constants';

export default function LikesPage() {
  const [user, loading] = useUser();
  const router = useRouter();

  if (typeof window !== 'undefined' && !loading && !user) {
    router.replace('/');
  }

  const [queries, setQueries] = useState(null);
  const [next, setNext] = useState(null);
  const cursor = +router.query.t || Infinity;

  useEffect(() => {
    if (!user) return;

    fetchQueryListLikedByUser(user.uid, cursor).then((data) => {
      setQueries(data);
      setNext(
        data.length === NUMBER_IN_QUERY_LIST
          ? data[NUMBER_IN_QUERY_LIST - 1].likedAt
          : null
      );
    });
  }, [user, cursor]);

  return (
    <Layout>
      <Head subtitle="お気に入り" />

      <Header as="h2" content="お気に入り" />

      <Divider hidden />

      {queries ? (
        <>
          <Card.Group itemsPerRow={2} stackable>
            {queries.map((props) => (
              <QueryCard {...props} key={props.queryId} />
            ))}
          </Card.Group>
          <Divider hidden />
          <QueryNextButton cursor={next} />
        </>
      ) : (
        <Loader active inline="centered" size="large" />
      )}
    </Layout>
  );
}
