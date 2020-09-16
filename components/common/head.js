import NextHead from 'next/head';
import { useRouter } from 'next/router';
import { SITE_TITLE, BASE_URL } from '@/lib/constants';

export default function Head({ title, subtitle, type }) {
  const router = useRouter();

  const description =
    '☆ピコピコプラネット☆ SPACE は、SPARQLクエリの共有サイトです。';

  if (subtitle) {
    title = `${subtitle} - ${SITE_TITLE}`;
  }

  type = type ?? 'website';

  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={`${BASE_URL}/ogp.png`} />
      <meta property="og:url" content={`${BASE_URL}${router.asPath}`} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={SITE_TITLE} />
      <meta property="twitter:card" content="summary" />
    </NextHead>
  );
}
