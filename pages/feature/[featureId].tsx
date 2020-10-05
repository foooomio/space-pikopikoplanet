import { Header } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import Hero from '@/components/common/hero';
import QuerySearchList from '@/components/query/search-list';
import features from '@/lib/features';
import type { GetStaticProps, GetStaticPaths } from 'next';
import PopularTags from '@/components/popular-tags';

type Props = {
  title: string;
  description: string;
  endpoint: string;
  website: string;
  backgroundColor: string;
  inverted?: boolean;
};

const FeaturePage = ({
  title,
  description,
  endpoint,
  website,
  backgroundColor,
  inverted,
}: Props) => {
  const hero = (
    <Hero
      title={title}
      description={description}
      endpoint={endpoint}
      website={website}
      style={{ backgroundColor }}
      inverted={inverted}
    />
  );

  return (
    <Layout hero={hero}>
      <Head subtitle={title} />

      <Header size="tiny" icon="star" content="Popular tags" />
      <PopularTags endpoint={endpoint} />

      <Header size="tiny" icon="bullhorn" content="Latest queries" />
      <QuerySearchList searchOptions={{ endpoint }} />
    </Layout>
  );
};

export default FeaturePage;

export const getStaticProps: GetStaticProps = async (context) => {
  const featureId = context.params!.featureId as string;
  const feature = features.find(({ id }) => id === featureId)!;

  return {
    props: feature,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: features.map(({ id }) => ({
      params: { featureId: id },
    })),
    fallback: false,
  };
};
