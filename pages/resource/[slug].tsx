import accepts from 'accepts';
import type { GetServerSideProps } from 'next';

const ResourcePage = () => null;
export default ResourcePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params!.slug as string;
  const match = slug.match(/([0-9a-f]{10})\.?(.+)?/);

  if (!match) {
    context.res.writeHead(307, { Location: '/404' }).end();
    return { props: {} };
  }

  const [, queryId, ext] = match;

  if (['ttl', 'rdf', 'xml', 'json', 'jsonld'].some((e) => e === ext)) {
    context.res.writeHead(303, { Location: `/data/${queryId}.${ext}` }).end();
    return { props: {} };
  }

  if (accepts(context.req).type('html') === 'html') {
    context.res.writeHead(303, { Location: `/query/${queryId}` }).end();
    return { props: {} };
  } else {
    context.res.writeHead(303, { Location: `/data/${queryId}` }).end();
    return { props: {} };
  }
};
