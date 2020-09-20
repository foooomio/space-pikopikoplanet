import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Card, Divider, Loader, Message } from 'semantic-ui-react';
import QueryCard from '@/components/query/card';
import QueryNextButton from '@/components/query/next-button';
import { fetchQueryList } from '@/lib/database';
import { NUMBER_IN_QUERY_LIST } from '@/lib/constants';

export default function QueryList({ searchOptions }) {
  const router = useRouter();
  const cursor = +router.query.t || Infinity;

  const { data, error } = useSWR(
    JSON.stringify({ cursor, ...searchOptions }),
    () => fetchQueryList(cursor, searchOptions)
  );

  if (error) {
    return (
      <Message
        negative
        icon="exclamation triangle"
        header="エラー"
        content="クエリの取得に失敗しました。"
      />
    );
  }

  if (!data) {
    return <Loader active inline="centered" size="large" />;
  }

  let next = null;
  let queries = data;

  if (data.length === NUMBER_IN_QUERY_LIST + 1) {
    next = data[NUMBER_IN_QUERY_LIST - 1].createdAt;
    queries = data.slice(0, -1);
  }

  return (
    <>
      <Card.Group itemsPerRow={2} stackable>
        {queries.map((props) => (
          <QueryCard {...props} key={props.queryId} />
        ))}
      </Card.Group>
      <Divider hidden />
      <QueryNextButton cursor={next} />
    </>
  );
}
