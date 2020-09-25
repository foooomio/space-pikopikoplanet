import React from 'react';
import NextHead from 'next/head';
import { useRouter } from 'next/router';
import { SITE_TITLE, BASE_URL } from '@/lib/constants';

type Props = {
  title?: string;
  subtitle?: string;
  type?: string;
  image?: string;
  card?: string;
};

const Head: React.FC<Props> = ({ title, subtitle, type, image, card }) => {
  const { asPath } = useRouter();
  const url = BASE_URL + asPath;

  const description =
    '☆ピコピコプラネット☆ SPACE は、SPARQLクエリの共有サイトです。';

  if (subtitle) {
    title = `${subtitle} - ${SITE_TITLE}`;
  }

  image = BASE_URL + (image ?? '/ogp.png');

  type = type ?? 'website';
  card = card ?? 'summary';

  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={SITE_TITLE} />
      <meta property="twitter:card" content={card} />
    </NextHead>
  );
};

export default Head;
