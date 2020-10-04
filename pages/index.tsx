import { Header, Segment, List } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import Hero from '@/components/common/hero';
import FeatureItem from '@/components/feature-item';
import QuerySearchList from '@/components/query/search-list';
import features from '@/lib/features';

const Home = () => {
  const hero = (
    <Hero
      title="☆ピコピコプラネット☆ SPACE へようこそ"
      subtitle="SPARQLクエリを共有しましょう"
      inverted
      index
    />
  );

  return (
    <Layout hero={hero}>
      <Head title="☆ピコピコプラネット☆ SPACE - SPARQLクエリ共有サイト" />

      <Header size="tiny" icon="bookmark" content="Features" />
      <Segment padded>
        <List>
          {Object.entries(features).map(
            ([key, { title, caption }]: [string, any]) => (
              <FeatureItem id={key} title={title} caption={caption} key={key} />
            )
          )}
        </List>
      </Segment>

      <Header size="tiny" icon="bullhorn" content="Latest queries" />
      <QuerySearchList />
    </Layout>
  );
};

export default Home;
