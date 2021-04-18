import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { url } = req.query;

    const response = await fetch(url as string, {
      headers: {
        Accept: req.headers.accept!,
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
