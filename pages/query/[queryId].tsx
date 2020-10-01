import Link from 'next/link';
import { Segment, Header, List, Divider } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import QueryMeta from '@/components/query/meta';
import SparqlEditor from '@/components/sparql/editor';
import QueryDescription from '@/components/query/description';
import QueryCommentForm from '@/components/query/comment-form';
import QueryLikeButton from '@/components/query/like-button';
import QueryTweetButton from '@/components/query/tweet-button';
import QueryFacebookButton from '@/components/query/facebook-button';
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
  forkedFrom,
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

        {forkedFrom && (
          <div>
            Forked from{' '}
            <Link href={`/query/[queryId]`} as={`/query/${forkedFrom}`}>
              <a>{forkedFrom}</a>
            </Link>
          </div>
        )}

        <SparqlEditor
          viewer={true}
          queryId={queryId}
          endpoint={endpoint}
          query={query}
        />

        <QueryDescription endpoint={endpoint} tags={tags} />

        <Divider />

        <QueryCommentForm queryId={queryId} queryAuthorUid={authorUid} />

        <Divider />

        <List horizontal>
          <List.Item>
            <QueryLikeButton queryId={queryId} queryAuthorUid={authorUid} />
          </List.Item>
          <List.Item>
            <QueryTweetButton
              queryId={queryId}
              title={title}
              authorName={authorName}
            />
          </List.Item>
          <List.Item>
            <QueryFacebookButton queryId={queryId} />
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
