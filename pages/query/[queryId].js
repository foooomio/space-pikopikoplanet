import Link from 'next/link';
import { Segment, Header, List, Divider, Label } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import QueryMeta from '@/components/query/meta';
import SparqlViewer from '@/components/sparql/viewer';
import TweetButton from '@/components/tweet-button';
import FacebookButton from '@/components/facebook-button';
import QueryEditButton from '@/components/query/edit-button';
import QueryDeleteButton from '@/components/query/delete-button';
import { useUser } from '@/lib/user-context';
import { fetchQuery } from '@/lib/database';

export default function QueryPage({
  queryId,
  title,
  authorUid,
  authorId,
  authorName,
  endpoint,
  query,
  tags,
  createdAt,
}) {
  const [user] = useUser();

  return (
    <Layout>
      <Head subtitle={`${title} by ${authorName}`} type="article" />

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

        <SparqlViewer query={query} endpoint={endpoint} />

        <Label.Group tag>
          {tags.map((tag) => (
            <Link href={`/search?tag=${tag}`} passHref key={tag}>
              <Label as="a" content={tag} />
            </Link>
          ))}
        </Label.Group>

        <Divider />

        <List horizontal>
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
}

export async function getServerSideProps(context) {
  const queryId = context.params.queryId;
  const query = await fetchQuery(queryId);

  if (!query) {
    context.res.writeHead(307, { Location: '/404' }).end();
    return { props: {} };
  }

  return {
    props: query,
  };
}
