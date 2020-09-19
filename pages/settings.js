import Link from 'next/link';
import { useRouter } from 'next/router';
import { Segment, Container, Header, Divider } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import SettingsForm from '@/components/settings-form';
import { useUser } from '@/lib/user-context';

export default function SettingsPage() {
  const [user, loading] = useUser();

  if (typeof window !== 'undefined' && !user && !loading) {
    const router = useRouter();
    router.replace('/sign-in');
  }

  return (
    <Layout>
      <Head subtitle="設定" />
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
}