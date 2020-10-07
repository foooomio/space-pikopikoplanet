import type { Query } from '@/lib/types';

export const renderAsTurtle = ({
  queryId,
  title,
  authorName,
  endpoint,
  query,
  tags,
  createdAt,
  updatedAt,
  forkedFrom,
}: Query) => {
  const escape = (str: string): string => str.replace(/"/g, '\\"');

  const template = `
@prefix schema: <http://schema.org/> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<https://space.pikopikopla.net/resource/${queryId}> a schema:CreativeWork ;
    schema:name "${escape(title)}" ;
    schema:creator "${escape(authorName)}" ;
    schema:material <${endpoint}> ;
    schema:text """${query}""" ;
    schema:dateCreated "${new Date(createdAt).toISOString()}"^^xsd:dateTime ;
    schema:dateModified "${new Date(updatedAt).toISOString()}"^^xsd:dateTime ;
    schema:keywords "${tags.join(',')}" ;
    schema:url <https://space.pikopikopla.net/query/${queryId}> .
`.trim();

  if (forkedFrom) {
    const isBasedOn = `    schema:isBasedOn <https://space.pikopikopla.net/query/${forkedFrom}> ;`;
    const splitted = template.split('\n');
    splitted.splice(-1, 0, isBasedOn);
    return splitted.join('\n');
  }

  return template;
};

export const renderAsRDFXML = ({
  queryId,
  title,
  authorName,
  endpoint,
  query,
  tags,
  createdAt,
  updatedAt,
  forkedFrom,
}: Query): string => {
  const escape = (str: string): string =>
    str
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/&/g, '&amp;');

  const template = `
<rdf:RDF
  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
  xmlns:schema="http://schema.org/"
  >
  <rdf:Description rdf:about="https://space.pikopikopla.net/resource/${queryId}">
    <rdf:type rdf:resource="http://schema.org/CreativeWork" />
    <schema:name>${escape(title)}</schema:name>
    <schema:creator>${escape(authorName)}</schema:creator>
    <schema:material rdf:resource="${endpoint}" />
    <schema:text>${escape(query)}</schema:text>
    <schema:dateCreated rdf:datatype="http://www.w3.org/2001/XMLSchema#dateTime">${new Date(
      createdAt
    ).toISOString()}</schema:dateCreated>
    <schema:dateModified rdf:datatype="http://www.w3.org/2001/XMLSchema#dateTime">${new Date(
      updatedAt
    ).toISOString()}</schema:dateModified>
    <schema:keywords>${tags.map(escape).join(',')}</schema:keywords>
    <schema:url rdf:resource="https://space.pikopikopla.net/query/${queryId}" />
  </rdf:Description>
</rdf:RDF>
`.trim();

  if (forkedFrom) {
    const isBasedOn = `    <schema:isBasedOn rdf:resource="https://space.pikopikopla.net/query/${forkedFrom}" />`;
    const splitted = template.split('\n');
    splitted.splice(-3, 0, isBasedOn);
    return splitted.join('\n');
  }

  return template;
};

export const renderAsJSONLD = ({
  queryId,
  title,
  authorName,
  endpoint,
  query,
  tags,
  createdAt,
  updatedAt,
  forkedFrom,
}: Query): string => {
  const jsonld: any = {
    '@context': {
      schema: 'http://schema.org/',
      xsd: 'http://www.w3.org/2001/XMLSchema#',
      'schema:material': {
        '@type': '@id',
      },
      'schema:dateCreated': {
        '@type': 'xsd:dateTime',
      },
      'schema:dateModified': {
        '@type': 'xsd:dateTime',
      },
      'schema:isBasedOn': {
        '@type': '@id',
      },
      'schema:url': {
        '@type': '@id',
      },
    },
    '@id': `https://space.pikopikopla.net/resource/${queryId}`,
    '@type': 'schema:CreativeWork',
    'schema:name': title,
    'schema:creator': authorName,
    'schema:material': endpoint,
    'schema:text': query,
    'schema:dateCreated': new Date(createdAt).toISOString(),
    'schema:dateModified': new Date(updatedAt).toISOString(),
    'schema:keywords': tags.join(','),
    'schema:url': `https://space.pikopikopla.net/query/${queryId}`,
  };

  if (forkedFrom) {
    const isBasedOn = `https://space.pikopikopla.net/query/${forkedFrom}`;
    jsonld['schema:isBasedOn'] = isBasedOn;
  }

  return JSON.stringify(jsonld, null, 2);
};