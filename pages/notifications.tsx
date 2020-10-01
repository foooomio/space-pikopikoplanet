import { useRouter } from 'next/router';
import { Segment, Container, Header } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import NotificationFeed from '@/components/notification/feed';
import { useUser } from '@/hooks/use-user';

const NotificationsPage = () => {
  const [user, loading] = useUser();
  const router = useRouter();

  if (typeof window !== 'undefined' && !loading && !user) {
    router.replace('/sign-in');
  }

  return (
    <Layout>
      <Head subtitle="通知" />

      <Segment>
        <Container text>
          <Header as="h2" content="通知" />

          <NotificationFeed />
        </Container>
      </Segment>
    </Layout>
  );
};

export default NotificationsPage;
