import type { NextApiRequest, NextApiResponse } from 'next';
import { URL } from 'url';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { endpoint, query } = req.query;

    const url = new URL(endpoint as string);
    url.searchParams.set('query', query as string);

    const response = await fetch(url.toString(), {
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
