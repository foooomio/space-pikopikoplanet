import { Segment, Item, List, Divider, Icon } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import QuerySearchList from '@/components/query/search-list';
import { fetchUserDataByUserId } from '@/lib/database';

export default function UserPage({
  uid,
  userId,
  userName,
  website,
  facebookId,
  twitterId,
  gitHubId,
}) {
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
                      icon="globe"
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
}

export async function getServerSideProps(context) {
  const userId = context.params.userId;
  const userData = await fetchUserDataByUserId(userId);

  if (!userData.uid) {
    context.res.writeHead(307, { Location: '/404' }).end();
    return { props: {} };
  }

  return {
    props: userData,
  };
}
