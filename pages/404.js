import Link from 'next/link';
import { Segment, Header, Icon, Button } from 'semantic-ui-react';
import Layout from '@/components/common/layout';

export default function Custom404() {
  return (
    <Layout>
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
}
