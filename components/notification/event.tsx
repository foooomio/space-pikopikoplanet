import Link from 'next/link';
import { Feed } from 'semantic-ui-react';
import { formatDate } from '@/lib/util';
import type { NotificationType } from '@/lib/types';

const getIcon = (type: NotificationType) => {
  switch (type) {
    case 'like':
      return 'heart';
    case 'comment':
      return 'comment alternate';
  }
};

const getText = (type: NotificationType) => {
  switch (type) {
    case 'like':
      return 'をお気に入りに追加しました。';
    case 'comment':
      return 'にコメントをつけました。';
  }
};

type Props = {
  type: NotificationType;
  queryId: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  unread: boolean;
};

const NotificationEvent = ({
  type,
  queryId,
  authorId,
  authorName,
  createdAt,
  unread,
}: Props) => {
  return (
    <Feed.Event style={{ backgroundColor: unread ? '#eee' : 'initial' }}>
      <Feed.Label icon={getIcon(type)} />
      <Feed.Content>
        <Feed.Summary>
          <Link href={`/user/[userId]`} as={`/user/${authorId}`}>
            <a>{authorName}</a>
          </Link>
          さんが
          <Link href={`/query/[queryId]`} as={`/query/${queryId}`}>
            <a>あなたのクエリ</a>
          </Link>
          {getText(type)}
        </Feed.Summary>
        <Feed.Meta>
          <Feed.Date>{formatDate(new Date(createdAt))}</Feed.Date>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  );
};

export default NotificationEvent;
