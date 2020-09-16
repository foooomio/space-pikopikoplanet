import { URL } from 'url';

export default async (req, res) => {
  try {
    const { endpoint, query } = req.query;

    const url = new URL(endpoint);
    url.searchParams.set('query', query);

    const response = await fetch(url, {
      headers: {
        Accept: 'application/sparql-results+json',
      },
    });

    const contentType = response.headers.get('content-type');
    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }

    res.status(response.status).send(await response.text());
  } catch (e) {
    res.status(400).send(e.message);
  }
};
