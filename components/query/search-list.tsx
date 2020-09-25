import React from 'react';
import QueryList from '@/components/query/list';
import { fetchQueryList } from '@/lib/database';
import { NUMBER_IN_QUERY_LIST } from '@/lib/constants';
import type { Query, SearchOptions } from '@/lib/types';

type Props = {
  searchOptions?: SearchOptions;
};

const QuerySearchList: React.FC<Props> = ({ searchOptions }) => {
  const getKey = (pageIndex: number, previousPageData: Query[]): any => {
    const cursor =
      pageIndex === 0
        ? Infinity
        : previousPageData[NUMBER_IN_QUERY_LIST - 1].createdAt;
    return [cursor, JSON.stringify(searchOptions)];
  };

  const fetcher = (cursor: number): Promise<Partial<Query>[]> =>
    fetchQueryList(cursor, NUMBER_IN_QUERY_LIST, searchOptions);

  return <QueryList getKey={getKey} fetcher={fetcher} />;
};

export default QuerySearchList;
