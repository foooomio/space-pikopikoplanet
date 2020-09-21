import QueryList from '@/components/query/list';
import { fetchQueryList } from '@/lib/database';
import { NUMBER_IN_QUERY_LIST } from '@/lib/constants';

export default function QuerySearchList({ searchOptions }) {
  const getKey = (pageIndex, previousPageData) => {
    const cursor =
      pageIndex === 0
        ? Infinity
        : previousPageData[NUMBER_IN_QUERY_LIST - 1].createdAt;
    return [cursor, JSON.stringify(searchOptions)];
  };

  const fetcher = (cursor) =>
    fetchQueryList(cursor, NUMBER_IN_QUERY_LIST, searchOptions);

  return <QueryList getKey={getKey} fetcher={fetcher} />;
}
