import { useRouter } from 'next/router';
import { Header, Divider } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import QueryLikesList from '@/components/query/likes-list';
import { useUser } from '@/lib/user-context';

export default function LikesPage() {
  const [user, loading] = useUser();
  const router = useRouter();

  if (typeof window !== 'undefined' && !loading && !user) {
    router.replace('/sign-in');
  }

  return (
    <Layout>
      <Head subtitle="お気に入り" />

      <Header as="h2" content="お気に入り" />

      <Divider hidden />

      <QueryLikesList />
    </Layout>
  );
}
