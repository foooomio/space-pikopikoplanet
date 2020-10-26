import Link from 'next/link';
import { Segment, Container, Header, Divider } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import SettingsForm from '@/components/settings-form';
import { SignInRequired } from '@/lib/user-context';

const SettingsPage = () => {
  return (
    <Layout>
      <Head subtitle="設定" />

      <SignInRequired />

      <Segment>
        <Container text>
          <Header as="h2">設定</Header>
          <SettingsForm />
          <Divider />
          <Link href="/">
            <a>トップページに戻る</a>
          </Link>
        </Container>
      </Segment>
    </Layout>
  );
};

export default SettingsPage;
