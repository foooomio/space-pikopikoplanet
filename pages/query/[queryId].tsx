import Link from 'next/link';
import { Segment, Header, List, Divider, Label } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import QueryMeta from '@/components/query/meta';
import SparqlEditor from '@/components/sparql/editor';
import QueryLikeButton from '@/components/query/like-button';
import TweetButton from '@/components/tweet-button';
import FacebookButton from '@/components/facebook-button';
import QueryEditButton from '@/components/query/edit-button';
import QueryDeleteButton from '@/components/query/delete-button';
import { useUser } from '@/hooks/use-user';
import { fetchQuery } from '@/lib/database';
import type { GetServerSideProps } from 'next';
import type { Query } from '@/lib/types';

const QueryPage = ({
  queryId,
  title,
  authorUid,
  authorId,
  authorName,
  endpoint,
  query,
  tags,
  createdAt,
}: Query) => {
  const [user] = useUser();

  return (
    <Layout>
      <Head
        subtitle={`${title} by ${authorName}`}
        type="article"
        image={`/api/og-image?id=${queryId}`}
        card="summary_large_image"
      />

      <Segment>
        <Header as="h2">
          {title}
          <Header.Subheader>
            <QueryMeta
              authorId={authorId}
              authorName={authorName}
              createdAt={createdAt}
            />
          </Header.Subheader>
        </Header>

        <SparqlEditor endpoint={endpoint} query={query} />

        <List>
          <List.Item>
            <Link
              href={`/search?endpoint=${encodeURIComponent(endpoint)}`}
              passHref
            >
              <Label content={endpoint} />
            </Link>
          </List.Item>

          <List.Item>
            <Label.Group tag>
              {tags.map((tag) => (
                <Link href={`/search?tag=${tag}`} passHref key={tag}>
                  <Label as="a" content={tag} />
                </Link>
              ))}
            </Label.Group>
          </List.Item>
        </List>

        <Divider />

        <List horizontal>
          <List.Item>
            <QueryLikeButton queryId={queryId} />
          </List.Item>
          <List.Item>
            <TweetButton title={title} authorName={authorName} />
          </List.Item>
          <List.Item>
            <FacebookButton />
          </List.Item>
        </List>

        {user?.uid === authorUid && (
          <List horizontal floated="right">
            <List.Item>
              <QueryEditButton queryId={queryId} />
            </List.Item>
            <List.Item>
              <QueryDeleteButton queryId={queryId} />
            </List.Item>
          </List>
        )}
      </Segment>
    </Layout>
  );
};

export default QueryPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryId = context.params!.queryId as string;
  const query = await fetchQuery(queryId);

  if (!query) {
    context.res.writeHead(307, { Location: '/404' }).end();
    return { props: {} };
  }

  return {
    props: query,
  };
};
