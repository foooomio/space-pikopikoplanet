import { Feed, Button, Loader } from 'semantic-ui-react';
import { useSWRInfinite } from 'swr';
import NotificationEvent from '@/components/notification/event';
import { useUser } from '@/hooks/use-user';
import { fetchNotifications } from '@/lib/database';
import { NUMBER_IN_NOTIFICATION_FEED } from '@/lib/constants';
import type { Notification } from '@/lib/types';

const NotificationFeed = () => {
  const [user] = useUser();

  const getKey = (
    pageIndex: number,
    previousPageData: Notification[] | null
  ): any => {
    if (!user) return null;
    const cursor =
      pageIndex === 0
        ? Infinity
        : previousPageData![NUMBER_IN_NOTIFICATION_FEED - 1].createdAt;
    return [cursor, 'notifications'];
  };

  const fetcher = (cursor: number): Promise<Notification[]> =>
    fetchNotifications(user!.uid, cursor, NUMBER_IN_NOTIFICATION_FEED);

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher);

  const notifications = data?.flat() ?? [];

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty ||
    (data && data[data.length - 1]?.length < NUMBER_IN_NOTIFICATION_FEED);

  return (
    <Feed>
      {notifications.map(
        (notification) =>
          notification && (
            <NotificationEvent
              {...notification}
              key={notification.notificationId}
            />
          )
      )}
      {isEmpty && <div>通知はまだ届いていません。</div>}
      {isLoadingMore && <Loader active inline="centered" size="large" />}
      {!isLoadingMore && !isEmpty && !isReachingEnd && (
        <Button fluid content="More" onClick={() => setSize(size + 1)} />
      )}
    </Feed>
  );
};

export default NotificationFeed;
