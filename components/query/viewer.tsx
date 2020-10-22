import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Segment, Header, List, Divider } from 'semantic-ui-react';
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

  type EditorState = { endpoint: string; query: string };
  const [editor, setEditor] = useState<EditorState>({ endpoint, query });

  useEffect(() => {
    setEditor({ endpoint, query });
  }, [endpoint, query]);

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
        endpoint={editor.endpoint}
        query={editor.query}
        onEndpointChange={(value) => setEditor({ ...editor, endpoint: value })}
        onQueryChange={(value) => setEditor({ ...editor, query: value })}
      />

      <QueryDescription endpoint={endpoint} tags={tags} />

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