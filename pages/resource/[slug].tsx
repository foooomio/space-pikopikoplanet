import accepts from 'accepts';
import type { GetServerSideProps } from 'next';

const ResourcePage = () => null;
export default ResourcePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params!.slug as string;
  const match = slug.match(/([0-9a-f]{10})\.?(.+)?/);

  if (!match) {
    return { notFound: true };
  }

  const [, queryId, ext] = match;

  let path: string;

  if (['ttl', 'rdf', 'xml', 'json', 'jsonld'].some((e) => e === ext)) {
    path = `/data/${queryId}.${ext}`;
  } else if (accepts(context.req).type('html') === 'html') {
    path = `/query/${queryId}`;
  } else {
    path = `/data/${queryId}`;
  }

  return {
    redirect: {
      statusCode: 303,
      destination: path,
    },
  };
};
