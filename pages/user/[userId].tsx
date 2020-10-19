import useSWR from 'swr';
import { Segment, Item, List, Divider, Loader, Icon } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import QuerySearchList from '@/components/query/search-list';
import { fetchUserDataByUserId } from '@/lib/database';
import { isBot } from '@/lib/util';
import type { GetServerSideProps } from 'next';
import type { UserData } from '@/lib/types';

type Props = {
  userId: string;
  initialData?: UserData;
};

const UserPage = ({ userId, initialData }: Props) => {
  const { data, error } = useSWR(
    ['user', userId],
    () => fetchUserDataByUserId(userId),
    { initialData }
  );

  if (error) {
    console.log(error);
  }

  if (!data) {
    return (
      <Layout>
        <Segment>
          <Loader active inline="centered" size="massive" />
        </Segment>
      </Layout>
    );
  }

  const { uid, userName, website, facebookId, twitterId, gitHubId } = data;

  return (
    <Layout>
      <Head subtitle={`${userName}が作成したSPARQLクエリ一覧`} />

      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="small">
              <Icon name="user circle" size="massive" />
            </Item.Image>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.params!.userId as string;

  if (isBot(context.req.headers['user-agent'] ?? '')) {
    return {
      props: {
        userId,
        initialData: await fetchUserDataByUserId(userId),
      },
    };
  }

  return {
    props: {
      userId,
    },
  };
};
