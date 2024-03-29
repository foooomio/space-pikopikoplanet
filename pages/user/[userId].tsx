import { Segment, Item, List, Divider } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import QuerySearchList from '@/components/query/search-list';
import { getAvatar } from '@/lib/avatar';
import { fetchUserDataByUserId } from '@/lib/database';
import type { GetStaticProps, GetStaticPaths } from 'next';
import type { UserData } from '@/lib/types';

const UserPage = ({
  uid,
  userId,
  userName,
  avatar,
  website,
  facebookId,
  twitterId,
  gitHubId,
}: UserData) => {
  return (
    <Layout>
      <Head subtitle={`${userName}が作成したSPARQLクエリ一覧`} />

      <Segment>
        <Item.Group>
          <Item>
            <Item.Image avatar size="tiny" src={getAvatar(avatar)} />
            <Item.Content>
              <Item.Header>{userName}</Item.Header>
              <Item.Meta>{userId}</Item.Meta>
              <Item.Description>
                <List>
                  {website && (
                    <List.Item
                      icon="home"
                      content={<a href={website}>{website}</a>}
                    />
                  )}
                  {facebookId && (
                    <List.Item
                      icon="facebook"
                      content={
                        <a href={`https://www.facebook.com/${facebookId}`}>
                          {facebookId}
                        </a>
                      }
                    />
                  )}
                  {twitterId && (
                    <List.Item
                      icon="twitter"
                      content={
                        <a href={`https://twitter.com/${twitterId}`}>
                          {twitterId}
                        </a>
                      }
                    />
                  )}
                  {gitHubId && (
                    <List.Item
                      icon="github"
                      content={
                        <a href={`https://github.com/${gitHubId}`}>
                          {gitHubId}
                        </a>
                      }
                    />
                  )}
                </List>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>

      <Divider hidden />

      <QuerySearchList searchOptions={{ authorUid: uid }} />
    </Layout>
  );
};

export default UserPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const userId = context.params!.userId as string;
  const userData = await fetchUserDataByUserId(userId);

  if (!userData) {
    return { notFound: true };
  }

  return {
    props: userData,
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
