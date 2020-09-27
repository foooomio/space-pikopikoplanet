import Link from 'next/link';
import { List } from 'semantic-ui-react';

type Props = {
  authorId: string;
  authorName: string;
  createdAt: number;
};

const QueryMeta = ({ authorId, authorName, createdAt }: Props) => {
  const timestamp = new Date(createdAt)
    .toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
    .replace(/-/g, '/');

  return (
    <List horizontal>
      <List.Item>
        <List.Icon name="user circle" />
        <Link href="/user/[userId]" as={`/user/${authorId}`}>
          <a>{authorName}</a>
        </Link>
      </List.Item>
      <List.Item>
        <List.Icon name="calendar alternate outline" />
        {timestamp}
      </List.Item>
    </List>
  );
};

export default QueryMeta;
