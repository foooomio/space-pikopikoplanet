import Link from 'next/link';
import { Comment } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import breaks from 'remark-breaks';
import { useUser } from '@/hooks/use-user';
import { getAvatar } from '@/lib/avatar';
import { formatDateTime } from '@/lib/util';

import 'github-markdown-css/github-markdown.css';

type Props = {
  authorUid: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  text: string;
  createdAt: number;
  onDelete: () => void;
};

const QueryComment = ({
  authorUid,
  authorId,
  authorName,
  authorAvatar,
  text,
  createdAt,
  onDelete,
}: Props) => {
  const { user } = useUser();

  return (
    <Comment>
      <Comment.Avatar src={getAvatar(authorAvatar)} />
      <Comment.Content>
        <Comment.Author as="span">
          <Link href={`/user/${authorId}`} prefetch={false}>
            <a className="author">{authorName}</a>
          </Link>
        </Comment.Author>
        <Comment.Metadata>{formatDateTime(createdAt)}</Comment.Metadata>
        <Comment.Text>
          <div className="markdown-body">
            <ReactMarkdown plugins={[gfm, breaks]} children={text} />
          </div>
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
