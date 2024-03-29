import Link from 'next/link';
import { List, Image } from 'semantic-ui-react';
import { getAvatar } from '@/lib/avatar';
import { formatDateTime } from '@/lib/util';

type Props = {
  authorId: string;
  authorName: string;
  authorAvatar: string;
  createdAt: number;
};

const QueryMeta = ({
  authorId,
  authorName,
  authorAvatar,
  createdAt,
}: Props) => {
  return (
    <List horizontal>
      <List.Item>
        <Image avatar src={getAvatar(authorAvatar)} />
        <List.Content>
          <Link href={`/user/${authorId}`} prefetch={false}>
            <a>{authorName}</a>
          </Link>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Icon name="calendar alternate outline" />
        <List.Content>{formatDateTime(createdAt)}</List.Content>
      </List.Item>
    </List>
  );
};

export default QueryMeta;
