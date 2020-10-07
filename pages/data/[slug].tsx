import accepts from 'accepts';
import { fetchQuery } from '@/lib/database';
import { renderAsTurtle, renderAsRDFXML, renderAsJSONLD } from '@/lib/template';
import type { IncomingMessage } from 'http';
import type { GetServerSideProps } from 'next';
import type { Query } from '@/lib/types';

const DataPage = () => null;
export default DataPage;

type RDFType = 'turtle' | 'xml' | 'json';

const determineRDFType = (ext: string, req: IncomingMessage): RDFType => {
  switch (ext) {
    case 'ttl':
      return 'turtle';
    case 'rdf':
    case 'xml':
      return 'xml';
    case 'json':
    case 'jsonld':
      return 'json';
  }

  switch (
    accepts(req).type(
      'text/turtle',
      'application/rdf+xml',
      'application/ld+json'
    )
  ) {
    case 'text/turtle':
      return 'turtle';
    case 'application/rdf+xml':
      return 'xml';
    case 'application/ld+json':
      return 'json';
  }

  return 'turtle';
};

const selectByRDFType = (type: RDFType): [(query: Query) => string, string] => {
  switch (type) {
    case 'turtle':
      return [renderAsTurtle, 'text/turtle'];
    case 'xml':
      return [renderAsRDFXML, 'application/rdf+xml'];
    case 'json':
      return [renderAsJSONLD, 'application/ld+json'];
  }
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params!.slug as string;
  const match = slug.match(/([0-9a-f]{10})\.?(.+)?/);

  if (!match) {
    context.res.writeHead(307, { Location: '/404' }).end();
    return { props: {} };
  }

  const [, queryId, ext] = match;

  const query = await fetchQuery(queryId);

  if (!query) {
    context.res.writeHead(307, { Location: '/404' }).end();
    return { props: {} };
  }

  const rdfType = determineRDFType(ext, context.req);

  const [render, contentType] = selectByRDFType(rdfType);

  context.res.setHeader('Content-Type', `${contentType}; charset=utf-8`);
  context.res.end(render(query));

  return { props: {} };
};
