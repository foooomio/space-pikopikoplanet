import { Header, Segment, List } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import Hero from '@/components/common/hero';
import Feature from '@/components/feature';
import QuerySearchList from '@/components/query/search-list';

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
          <Feature
            id="im@sparql"
            title="im@sparql"
            description="広がるアイドルマスターの世界をオープンデータ化"
          />
        </List>
      </Segment>

      <Header size="tiny" icon="bullhorn" content="Latest queries" />
      <QuerySearchList />
    </Layout>
  );
};

export default Home;
