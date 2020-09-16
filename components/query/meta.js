import Link from 'next/link';
import { List, Icon } from 'semantic-ui-react';

export default function QueryMeta({ authorId, authorName, createdAt }) {
  const timestamp = new Date(createdAt)
    .toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
    .replace(/-/g, '/');

  return (
    <List horizontal>
      <List.Item>
        <Icon name="user circle" />
        <Link href="/user/[userId]" as={`/user/${authorId}`}>
          <a>{authorName}</a>
        </Link>
      </List.Item>
      <List.Item>
        <Icon name="calendar alternate outline" />
        {timestamp}
      </List.Item>
    </List>
  );
}
