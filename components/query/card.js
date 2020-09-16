import Link from 'next/link';
import { Card, Header, List, Icon } from 'semantic-ui-react';
import QueryMeta from '@/components/query/meta';

export default function QueryCard({
  queryId,
  title,
  authorId,
  authorName,
  endpoint,
  tags,
  createdAt,
}) {
  return (
    <Card fluid>
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
              style={{ overflow: 'auto' }}
            />
            <List.Item icon="tags" content={tags.join(' / ')} />
          </List>
        </Card.Description>
      </Card.Content>
    </Card>
  );
}
