import { useSWRInfinite } from 'swr';
import { Button, Card, Divider, Loader } from 'semantic-ui-react';
import QueryCard from '@/components/query/card';
import { NUMBER_IN_QUERY_LIST } from '@/lib/constants';
import type { Query } from '@/lib/types';

type Props = {
  getKey: (pageIndex: number, previousPageData: Query[] | null) => any[] | null;
  fetcher: (...args: any[]) => Promise<Query[]>;
};

const QueryList = ({ getKey, fetcher }: Props) => {
  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher);

  if (error) {
    console.error(error);
  }

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
        {queries.map(
          (query) => query && <QueryCard {...query} key={query.queryId} />
        )}
      </Card.Group>
      <Divider hidden />
      {isEmpty && <div>クエリがありません。</div>}
      {isLoadingMore && <Loader active inline="centered" size="large" />}
      {!isLoadingMore && !isEmpty && !isReachingEnd && (
        <Button fluid content="More" onClick={() => setSize(size + 1)} />
      )}
    </>
  );
};

export default QueryList;
