import React from 'react';
import Link from 'next/link';
import { Card, Header, List, Icon } from 'semantic-ui-react';
import QueryMeta from '@/components/query/meta';
import QueryLikeButton from '@/components/query/like-button';
import type { Query } from '@/lib/types';

const QueryCard: React.FC<Query> = ({
  queryId,
  title,
  authorId,
  authorName,
  endpoint,
  tags,
  createdAt,
}) => {
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
          <List>
            <List.Item
              icon="compass outline"
              content={endpoint}
              style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
            />
            <List.Item icon="tags" content={tags.join(' / ')} />
          </List>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <QueryLikeButton queryId={queryId} />
      </Card.Content>
    </Card>
  );
};

export default QueryCard;
