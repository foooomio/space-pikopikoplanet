import { Header, Divider, Icon } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import QueryList from '@/components/query/list';
import { fetchQueryList } from '@/lib/database';

export default function SearchPage({ condition, queries }) {
  return (
    <Layout>
      <Head subtitle="検索結果" />

      <Header as="h2">
        検索結果
        <Header.Subheader>
          <Icon name="tag" />
          {condition.tag}
        </Header.Subheader>
      </Header>

      <Divider hidden />

      <QueryList queries={queries} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const tag = context.query.tag;
  const cursor = +context.query.t || Infinity;
  const queries = await fetchQueryList(cursor, { tag });

  return {
    props: {
      condition: {
        tag,
      },
      queries,
    },
  };
}
