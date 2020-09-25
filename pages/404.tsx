import Link from 'next/link';
import { Segment, Header, Icon, Button } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';

const Custom404 = () => {
  return (
    <Layout>
      <Head title="404 Not Found" />
      <Segment placeholder>
        <Header size="large" icon>
          <Icon name="times circle" />
          404 Not Found
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
};

export default Custom404;
