import Link from 'next/link';
import { Segment, Header, Button, Icon, Divider } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import QueryList from '@/components/query/list';
import { fetchQueryList } from '@/lib/database';

export default function Home({ queries }) {
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

      <QueryList queries={queries} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const cursor = +context.query.t || Infinity;
  const queries = await fetchQueryList(cursor);
  return {
    props: {
      queries,
    },
  };
}
