import { useRouter } from 'next/router';
import { Header, Divider, List } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import QuerySearchList from '@/components/query/search-list';

const SearchPage = () => {
  const router = useRouter();
  const endpoint = router.query.endpoint as string;
  const tag = router.query.tag as string;

  return (
    <Layout>
      <Head subtitle="検索結果" />

      <Header as="h2">
        検索結果
        <Header.Subheader>
          <List>
            {endpoint && (
              <List.Item>
                <List.Icon name="compass outline" />
                {endpoint}
              </List.Item>
            )}
            {tag && (
              <List.Item>
                <List.Icon name="tag" />
                {tag}
              </List.Item>
            )}
          </List>
        </Header.Subheader>
      </Header>

      <Divider hidden />

      <QuerySearchList searchOptions={{ endpoint, tag }} />
    </Layout>
  );
};

export default SearchPage;
