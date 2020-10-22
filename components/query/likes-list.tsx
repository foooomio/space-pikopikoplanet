import QueryList from '@/components/query/list';
import { fetchQueryListLikedByUser } from '@/lib/database';
import { useUser } from '@/hooks/use-user';
import { NUMBER_IN_QUERY_LIST } from '@/lib/constants';
import type { Query } from '@/lib/types';

const QueryLikesList = () => {
  const [user] = useUser();

  const getKey = (
    pageIndex: number,
    previousPageData: Query[] | null
  ): any[] | null => {
    if (!user) return null;
    const cursor =
      pageIndex !== 0 && previousPageData
        ? previousPageData[NUMBER_IN_QUERY_LIST - 1].likedAt
        : Infinity;
    return [cursor, 'likes'];
  };

  const fetcher = (cursor: number): Promise<Query[]> =>
    fetchQueryListLikedByUser(user!.uid, cursor, NUMBER_IN_QUERY_LIST);

  return <QueryList getKey={getKey} fetcher={fetcher} />;
};

export default QueryLikesList;
