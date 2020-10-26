import Link from 'next/link';
import { List } from 'semantic-ui-react';
import { formatDateTime } from '@/lib/util';

type Props = {
  authorId: string;
  authorName: string;
  createdAt: number;
};

const QueryMeta = ({ authorId, authorName, createdAt }: Props) => {
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
        {formatDateTime(createdAt)}
      </List.Item>
    </List>
  );
};

export default QueryMeta;
