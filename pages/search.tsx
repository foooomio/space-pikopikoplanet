import { useRouter } from 'next/router';
import { Header, Divider, Icon } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import QuerySearchList from '@/components/query/search-list';

const SearchPage = () => {
  const router = useRouter();
  const tag = router.query.tag as string;

  return (
    <Layout>
      <Head subtitle="検索結果" />

      <Header as="h2">
        検索結果
        <Header.Subheader>
          <Icon name="tag" />
          {tag}
        </Header.Subheader>
      </Header>

      <Divider hidden />

      <QuerySearchList searchOptions={{ tag }} />
    </Layout>
  );
};

export default SearchPage;
