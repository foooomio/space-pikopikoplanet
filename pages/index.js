import Link from 'next/link';
import { Segment, Header, Button, Icon, Divider } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import QueryList from '@/components/query/list';

export default function Home() {
  return (
    <Layout>
      <Head title="☆ピコピコプラネット☆ SPACE - SPARQLクエリ共有サイト" />

      <Segment placeholder>
        <Header icon>
          <Icon name="compass outline" />
          SPARQLクエリを共有しましょう。
        </Header>
        <Segment.Inline>
          <Link href="/compose">
            <a>
              <Button primary content="新規作成" />
            </a>
          </Link>
        </Segment.Inline>
      </Segment>

      <Divider hidden />

      <QueryList />
    </Layout>
  );
}
