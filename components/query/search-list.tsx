import QueryList from '@/components/query/list';
import { fetchQueryList } from '@/lib/database';
import { NUMBER_IN_QUERY_LIST } from '@/lib/constants';
import type { Query, SearchOptions } from '@/lib/types';

type Props = {
  searchOptions?: SearchOptions;
};

const QuerySearchList = ({ searchOptions }: Props) => {
  const getKey = (
    pageIndex: number,
    previousPageData: Query[] | null
  ): any[] | null => {
    const cursor =
      pageIndex !== 0 && previousPageData
        ? previousPageData[NUMBER_IN_QUERY_LIST - 1].createdAt
        : Infinity;
    return [cursor, JSON.stringify(searchOptions)];
  };

  const fetcher = (cursor: number): Promise<Query[]> =>
    fetchQueryList(cursor, NUMBER_IN_QUERY_LIST, searchOptions);

  return <QueryList getKey={getKey} fetcher={fetcher} />;
};

export default QuerySearchList;
