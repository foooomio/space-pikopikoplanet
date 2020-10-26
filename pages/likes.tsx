import { Header, Divider } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import QueryLikesList from '@/components/query/likes-list';
import { SignInRequired } from '@/lib/user-context';

const LikesPage = () => {
  return (
    <Layout>
      <Head subtitle="お気に入り" />

      <SignInRequired />

      <Header as="h2" content="お気に入り" />

      <Divider hidden />

      <QueryLikesList />
    </Layout>
  );
};

export default LikesPage;
