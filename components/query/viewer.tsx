import Link from 'next/link';
import { useRouter } from 'next/router';
import { Segment, Header, Button, List, Divider } from 'semantic-ui-react';
import QueryMeta from '@/components/query/meta';
import SparqlEditor from '@/components/sparql/editor';
import QueryDescription from '@/components/query/description';
import QueryCommentForm from '@/components/query/comment-form';
import QueryEmbedCode from '@/components/query/embed-code';
import QueryLikeButton from '@/components/query/like-button';
import QueryTweetButton from '@/components/query/tweet-button';
import QueryFacebookButton from '@/components/query/facebook-button';
import QueryEditButton from '@/components/query/edit-button';
import QueryDeleteButton from '@/components/query/delete-button';
import { useForkedFrom } from '@/hooks/use-forked-from';
import { useUser } from '@/hooks/use-user';
import { useEditor } from '@/hooks/use-editor';
import type { Query } from '@/lib/types';

const QueryViewer = ({
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
  const router = useRouter();
  const { editor, handleEndpointChange, handleQueryChange } = useEditor(
    endpoint,
    query
  );
  const queryForkedFrom = useForkedFrom(forkedFrom);

  const handleFork = () => {
    router.push({
      pathname: '/compose',
      query: {
        fork: queryId,
        endpoint: editor.endpoint,
        query: editor.query,
      },
    });
  };

  return (
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

      {queryForkedFrom && (
        <div>
          Forked from{' '}
          <Link href={`/query/${queryForkedFrom.queryId}`}>
            <a>{queryForkedFrom.title}</a>
          </Link>{' '}
          by {queryForkedFrom.authorName}
        </div>
      )}

      <SparqlEditor
        endpoint={editor.endpoint}
        query={editor.query}
        onEndpointChange={handleEndpointChange}
        onQueryChange={handleQueryChange}
        subButton={
          <Button
            basic
            color="grey"
            content="Fork"
            icon="fork"
            onClick={handleFork}
          />
        }
      />

      <QueryDescription endpoint={endpoint} tags={tags} />

      <QueryEmbedCode queryId={queryId} />

      <Divider />

      <QueryCommentForm queryId={queryId} queryAuthorUid={authorUid} />

      <Divider />

      <List horizontal>
        <List.Item>Download as</List.Item>
        <List.Item>
          <a href={`/data/${queryId}.ttl`}>Turtle</a>
        </List.Item>
        <List.Item>
          <a href={`/data/${queryId}.rdf`}>RDF/XML</a>
        </List.Item>
        <List.Item>
          <a href={`/data/${queryId}.jsonld`}>JSON-LD</a>
        </List.Item>
      </List>

      <div>
        <a href="https://creativecommons.org/licenses/by/4.0/deed.ja">
          CC BY 4.0
        </a>{' '}
        © {new Date(createdAt).getUTCFullYear()} {authorName}
      </div>

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
  );
};

export default QueryViewer;
