import { useSWRInfinite } from 'swr';
import { Button, Card, Divider, Loader } from 'semantic-ui-react';
import QueryCard from '@/components/query/card';
import { NUMBER_IN_QUERY_LIST } from '@/lib/constants';

export default function QueryList({ getKey, fetcher }) {
  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher);

  const queries = data?.flat() ?? [];

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < NUMBER_IN_QUERY_LIST);

  return (
    <>
      <Card.Group itemsPerRow={2} stackable>
        {queries.map((props) => (
          <QueryCard {...props} key={props.queryId} />
        ))}
      </Card.Group>
      <Divider hidden />
      {isLoadingMore && <Loader active inline="centered" size="large" />}
      {!isLoadingMore && !isEmpty && !isReachingEnd && (
        <Button fluid content="More" onClick={() => setSize(size + 1)} />
      )}
    </>
  );
}
