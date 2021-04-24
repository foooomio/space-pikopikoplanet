import { Header, Divider } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import QueryLikesList from '@/components/query/likes-list';
import { useSignInRequired } from '@/hooks/use-sign-in-required';

const LikesPage = () => {
  useSignInRequired();

  return (
    <Layout>
      <Head subtitle="お気に入り" />

      <Header as="h2" content="お気に入り" />

      <Divider hidden />

      <QueryLikesList />
    </Layout>
  );
};

export default LikesPage;
