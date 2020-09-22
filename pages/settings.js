import Link from 'next/link';
import { useRouter } from 'next/router';
import { Segment, Container, Header, Divider } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import SettingsForm from '@/components/settings-form';
import { useUser } from '@/hooks/use-user';

export default function SettingsPage() {
  const [user, loading] = useUser();
  const router = useRouter();

  if (typeof window !== 'undefined' && !user && !loading) {
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
