import { DataFactory, Store } from 'n3';
import { newEngine } from '@comunica/actor-init-sparql-rdfjs';
import { fetchAllQueries } from '@/lib/database';
import { BASE_URL } from '@/lib/constants';
import type { GetServerSideProps } from 'next';
import type { Quad } from 'n3';
import type { Query } from '@/lib/types';

const SparqlEndpoint = () => null;
export default SparqlEndpoint;

const { namedNode, literal, quad } = DataFactory;

const createQuads = ({
  queryId,
  title,
  authorName,
  endpoint,
  query,
  tags,
  createdAt,
  updatedAt,
  forkedFrom,
}: Query): Quad[] => {
  const subject = namedNode(`${BASE_URL}/resource/${queryId}`);

  const quads = [
    quad(
      subject,
      namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      namedNode('http://schema.org/CreativeWork')
    ),
    quad(subject, namedNode('http://schema.org/name'), literal(title)),
    quad(subject, namedNode('http://schema.org/creator'), literal(authorName)),
    quad(subject, namedNode('http://schema.org/material'), literal(endpoint)),
    quad(subject, namedNode('http://schema.org/text'), literal(query)),
    quad(
      subject,
      namedNode('http://schema.org/dateCreated'),
      literal(
        new Date(createdAt).toISOString(),
        namedNode('http://www.w3.org/2001/XMLSchema#dateTime')
      )
    ),
    quad(
      subject,
      namedNode('http://schema.org/dateModified'),
      literal(
        new Date(updatedAt).toISOString(),
        namedNode('http://www.w3.org/2001/XMLSchema#dateTime')
      )
    ),
    quad(
      subject,
      namedNode('http://schema.org/keywords'),
      literal(tags.join(','))
    ),
    quad(
      subject,
      namedNode('http://schema.org/license'),
      namedNode('https://creativecommons.org/licenses/by/4.0/legalcode')
    ),
    quad(
      subject,
      namedNode('http://schema.org/copyrightYear'),
      literal(new Date(createdAt).getUTCFullYear())
    ),
    quad(
      subject,
      namedNode('http://schema.org/copyrightHolder'),
      literal(authorName)
    ),
    quad(
      subject,
      namedNode('http://schema.org/url'),
      namedNode(`${BASE_URL}/query/${queryId}`)
    ),
  ];

  if (forkedFrom) {
    quads.push(
      quad(
        subject,
        namedNode('http://schema.org/isBasedOn'),
        namedNode(`${BASE_URL}/resource/${forkedFrom}`)
      )
    );
  }

  return quads;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    'Content-Type',
    'application/sparql-results+json; charset=utf-8'
  );

  if (!context.query.query || Array.isArray(context.query.query)) {
    context.res.end('{}');
    return { props: {} };
  }

  const store = new Store();

  for (const query of await fetchAllQueries()) {
    store.addQuads(createQuads(query));
  }

  const sparqlEngine = newEngine();

  const result = await sparqlEngine.query(context.query.query, {
    sources: [store],
  });

  const { data } = await sparqlEngine.resultToString(
    result,
    'application/sparql-results+json'
  );

  const chunks = [];
  for await (const chunk of data) {
    chunks.push(chunk);
  }

  context.res.end(chunks.join(''));

  return { props: {} };
};
