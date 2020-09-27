import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import QuerySearchList from '@/components/query/search-list';

const Home = () => {
  return (
    <Layout hero={true}>
      <Head title="☆ピコピコプラネット☆ SPACE - SPARQLクエリ共有サイト" />

      <QuerySearchList />
    </Layout>
  );
};

export default Home;
