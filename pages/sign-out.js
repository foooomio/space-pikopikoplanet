import Link from 'next/link';
import { Segment, Header, Icon, Button } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';

export default function SignOutPage() {
  return (
    <Layout>
      <Head subtitle="サインアウトしました" />
      <Segment placeholder>
        <Header size="large" icon>
          <Icon name="power off" />
          サインアウトしました
        </Header>
        <Segment.Inline>
          <Link href="/">
            <a>
              <Button primary content="トップページへ" />
            </a>
          </Link>
        </Segment.Inline>
      </Segment>
    </Layout>
  );
}
