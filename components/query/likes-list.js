import QueryList from '@/components/query/list';
import { fetchQueryListLikedByUser } from '@/lib/database';
import { useUser } from '@/hooks/use-user';
import { NUMBER_IN_QUERY_LIST } from '@/lib/constants';

export default function QueryLikesList() {
  const [user] = useUser();

  const getKey = (pageIndex, previousPageData) => {
    if (!user) return null;
    const cursor =
      pageIndex === 0
        ? Infinity
        : previousPageData[NUMBER_IN_QUERY_LIST - 1].likedAt;
    return [cursor, 'likes'];
  };

  const fetcher = (cursor) =>
    fetchQueryListLikedByUser(user.uid, cursor, NUMBER_IN_QUERY_LIST);

  return <QueryList getKey={getKey} fetcher={fetcher} />;
}
