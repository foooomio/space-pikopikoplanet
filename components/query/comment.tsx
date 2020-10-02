import Link from 'next/link';
import { Comment, Icon } from 'semantic-ui-react';
import { useUser } from '@/hooks/use-user';
import { formatDate } from '@/lib/util';
import { markdown } from '@/lib/markdown';

type Props = {
  authorUid: string;
  authorId: string;
  authorName: string;
  text: string;
  createdAt: number;
  onDelete: () => void;
};

const QueryComment = ({
  authorUid,
  authorId,
  authorName,
  text,
  createdAt,
  onDelete,
}: Props) => {
  const [user] = useUser();

  return (
    <Comment>
      <Comment.Content>
        <Icon name="user circle" />
        <Comment.Author as="span">
          <Link href="/user/[userId]" as={`/user/${authorId}`}>
            <a className="author">{authorName}</a>
          </Link>
        </Comment.Author>
        <Comment.Metadata>{formatDate(new Date(createdAt))}</Comment.Metadata>
        <Comment.Text>
          <div className="markdown-body">{markdown(text)}</div>
        </Comment.Text>
        <Comment.Actions>
          {authorUid === user?.uid && (
            <Comment.Action onClick={onDelete}>Delete</Comment.Action>
          )}
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  );
};

export default QueryComment;
