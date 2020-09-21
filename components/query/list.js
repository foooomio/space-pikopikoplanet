import { Button, Card, Divider, Loader } from 'semantic-ui-react';
import QueryCard from '@/components/query/card';
import { useInfiniteScroll } from '@/lib/use-infinite-scroll';
import { NUMBER_IN_QUERY_LIST } from '@/lib/constants';

export default function QueryList({ getKey, fetcher }) {
  const {
    data,
    size,
    setSize,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
  } = useInfiniteScroll(getKey, fetcher, {}, NUMBER_IN_QUERY_LIST);

  const queries = data?.flat() ?? [];

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
