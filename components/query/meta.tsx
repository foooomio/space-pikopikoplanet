import React from 'react';
import Link from 'next/link';
import { List, Icon } from 'semantic-ui-react';

type Props = {
  authorId: string;
  authorName: string;
  createdAt: number;
};

const QueryMeta: React.FC<Props> = ({ authorId, authorName, createdAt }) => {
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
};

export default QueryMeta;
