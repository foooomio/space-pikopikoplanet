import { Header, Segment, List } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import Hero from '@/components/common/hero';
import FeaturedServiceItem from '@/components/featured-service-item';
import PopularTags from '@/components/popular-tags';
import QuerySearchList from '@/components/query/search-list';
import featuredServices from '@/lib/featured-services';

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

      <Header size="tiny" icon="bookmark" content="Featured Services" />
      <Segment padded>
        <List relaxed="very">
          {featuredServices.map(({ id, title, caption }) => (
            <FeaturedServiceItem
              id={id}
              title={title}
              caption={caption}
              key={id}
            />
          ))}
        </List>
      </Segment>

      <Header size="tiny" icon="star" content="Popular tags" />
      <PopularTags />

      <Header size="tiny" icon="bullhorn" content="Latest queries" />
      <QuerySearchList />
    </Layout>
  );
};

export default Home;
