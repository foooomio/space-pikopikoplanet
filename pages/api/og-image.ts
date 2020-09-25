import type { NextApiRequest, NextApiResponse } from 'next';
import https from 'https';
import { fetchQuery } from '@/lib/database';
import { doubleEscape } from '@/lib/util';

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME ?? '';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    const { title, authorName } = await fetchQuery(id as string);

    const center = doubleEscape(title!);
    const bottom = doubleEscape(authorName!);

    const transformations = [
      `l_text:notosansjp-bold.otf_70_bold:${center},co_rgb:333,w_1000,c_fit`,
      `l_text:notosansjp-bold.otf_40_bold:by%20${bottom},co_rgb:333,g_south_east,x_100,y_80`,
    ].join('/');
    const path = `/${CLOUD_NAME}/image/upload/${transformations}/space-pikopikoplanet.png`;
    const url = `https://res.cloudinary.com${path}`;

    https
      .get(url, (image) => {
        res.statusCode = image.statusCode!;
        res.setHeader('Content-Type', 'image/png');

        image.on('data', (chunk) => res.write(chunk));
        image.on('end', () => res.end());
      })
      .on('error', (e) => {
        console.error(e);
        res.status(500).end();
      });
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
};

export const config = {
  api: {
    externalResolver: true,
  },
};
