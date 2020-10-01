import { Segment, Container, Header } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import NotificationFeed from '@/components/notification/feed';

const NotificationsPage = () => {
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
