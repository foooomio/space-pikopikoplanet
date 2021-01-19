import { Header } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import Hero from '@/components/common/hero';
import QuerySearchList from '@/components/query/search-list';
import featuredServices from '@/lib/featured-services';
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

const FeaturedServicePage = ({
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

export default FeaturedServicePage;

export const getStaticProps: GetStaticProps = async (context) => {
  const featuredServiceId = context.params!.featuredServiceId as string;
  const featuredService = featuredServices.find(
    ({ id }) => id === featuredServiceId
  )!;

  return {
    props: featuredService,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: featuredServices.map(({ id }) => ({
      params: { featuredServiceId: id },
    })),
    fallback: false,
  };
};
