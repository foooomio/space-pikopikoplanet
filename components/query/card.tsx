import Link from 'next/link';
import { Card, Header, Icon } from 'semantic-ui-react';
import QueryMeta from '@/components/query/meta';
import QueryDescription from '@/components/query/description';
import QueryLikeButton from '@/components/query/like-button';

type Props = {
  queryId: string;
  title: string;
  authorId: string;
  authorName: string;
  endpoint: string;
  tags: string[];
  createdAt: number;
};

const QueryCard = ({
  queryId,
  title,
  authorId,
  authorName,
  endpoint,
  tags,
  createdAt,
}: Props) => {
  return (
    <Card fluid color="grey">
      <Card.Content>
        <Card.Header>
          <Link href="/query/[queryId]" as={`/query/${queryId}`}>
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
          <QueryDescription endpoint={endpoint} tags={tags} />
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <QueryLikeButton queryId={queryId} />
      </Card.Content>
    </Card>
  );
};

export default QueryCard;
