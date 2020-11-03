import { useEffect, useRef } from 'react';
import { Button, Label } from 'semantic-ui-react';
import SparqlEditor from '@/components/sparql/editor';
import { useEditor } from '@/hooks/use-editor';
import { fetchQuery } from '@/lib/database';
import type { GetStaticProps, GetStaticPaths } from 'next';
import type { Query } from '@/lib/types';

const style = 'body { background: transparent !important; }';

const EmbedPage = ({
  queryId,
  authorName,
  endpoint,
  query,
  createdAt,
}: Query) => {
  const ref = useRef<HTMLDivElement>(null);
  const prev = useRef<number>(0);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const height = ref.current?.scrollHeight;
      if (height && height !== prev.current) {
        window.parent.postMessage({ height }, '*');
        prev.current = height;
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  const { editor, handleEndpointChange, handleQueryChange } = useEditor(
    endpoint,
    query
  );

  return (
    <div style={{ margin: '0 1px' }} ref={ref}>
      <SparqlEditor
        endpoint={editor.endpoint}
        query={editor.query}
        onEndpointChange={handleEndpointChange}
        onQueryChange={handleQueryChange}
        subButton={
          <a
            href={`/query/${queryId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button basic color="grey" content="Details" icon="external" />
          </a>
        }
      />

      <div style={{ textAlign: 'center' }}>
        <Label
          basic
          href="https://creativecommons.org/licenses/by/4.0/deed.ja"
          target="_blank"
          rel="noopener noreferrer"
        >
          CC BY 4.0 © {new Date(createdAt).getUTCFullYear()} {authorName}
        </Label>
      </div>

      <style dangerouslySetInnerHTML={{ __html: style }} />
    </div>
  );
};

export default EmbedPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const embedId = context.params!.embedId as string;
  const query = await fetchQuery(embedId);

  if (!query) {
    return { notFound: true };
  }

  return {
    props: query,
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
