import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import Hero from '@/components/common/hero';
import QuerySearchList from '@/components/query/search-list';
import features from '@/lib/features';
import type { GetStaticProps, GetStaticPaths } from 'next';

type Props = {
  title: string;
  description: string;
  endpoint: string;
  website: string;
  backgroundColor: string;
};

const FeaturePage = ({
  title,
  description,
  endpoint,
  website,
  backgroundColor,
}: Props) => {
  const hero = (
    <Hero
      title={title}
      description={description}
      endpoint={endpoint}
      website={website}
      style={{ backgroundColor }}
    />
  );

  return (
    <Layout hero={hero}>
      <Head subtitle={title} />

      <QuerySearchList searchOptions={{ endpoint }} />
    </Layout>
  );
};

export default FeaturePage;

export const getStaticProps: GetStaticProps = async (context) => {
  const featureId = context.params!.featureId as string;
  const feature = features[featureId];

  return {
    props: feature,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Object.keys(features).map((featureId) => ({
      params: { featureId },
    })),
    fallback: false,
  };
};
