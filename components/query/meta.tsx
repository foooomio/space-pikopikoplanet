import Link from 'next/link';
import { List } from 'semantic-ui-react';
import { formatDate } from '@/lib/util';

type Props = {
  authorId: string;
  authorName: string;
  createdAt: number;
};

const QueryMeta = ({ authorId, authorName, createdAt }: Props) => {
  const timestamp = formatDate(new Date(createdAt));

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
