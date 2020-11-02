import Link from 'next/link';
import { Card, Header, Icon } from 'semantic-ui-react';
import QueryMeta from '@/components/query/meta';
import QueryDescription from '@/components/query/description';
import QueryLikeButton from '@/components/query/like-button';
import { useForkedFrom } from '@/hooks/use-forked-from';

type Props = {
  queryId: string;
  title: string;
  authorUid: string;
  authorId: string;
  authorName: string;
  endpoint: string;
  tags: string[];
  createdAt: number;
  forkedFrom?: string;
};

const QueryCard = ({
  queryId,
  title,
  authorUid,
  authorId,
  authorName,
  endpoint,
  tags,
  createdAt,
  forkedFrom,
}: Props) => {
  const queryForkedFrom = useForkedFrom(forkedFrom);

  return (
    <Card fluid raised>
      <Card.Content>
        <Card.Header>
          <Link href={`/query/${queryId}`}>
            <a>
              <Header as="h3">
                {title}
                <Icon name="angle right" />
              </Header>
            </a>
          </Link>
        </Card.Header>
        <Card.Meta>
          <QueryMeta
            authorId={authorId}
            authorName={authorName}
            createdAt={createdAt}
          />
        </Card.Meta>
        <Card.Description>
          {queryForkedFrom && (
            <div>
              Forked from{' '}
              <Link href={`/query/${queryForkedFrom.queryId}`}>
                <a>{queryForkedFrom.title}</a>
              </Link>{' '}
              by {queryForkedFrom.authorName}
            </div>
          )}
          <QueryDescription endpoint={endpoint} tags={tags} />
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <QueryLikeButton queryId={queryId} queryAuthorUid={authorUid} />
      </Card.Content>
    </Card>
  );
};

export default QueryCard;
