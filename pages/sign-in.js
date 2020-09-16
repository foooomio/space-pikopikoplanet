import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Segment, Header } from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import firebase from '@/lib/firebase';

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/settings',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
  ],
  tosUrl: '/terms-of-service',
  privacyPolicyUrl: '/privacy-policy',
};

export default function SignInPage() {
  return (
    <Layout>
      <Head subtitle="サインイン" />
      <Segment>
        <Header as="h2" textAlign="center">
          サインイン
          <Header.Subheader>
            すべての機能を利用するためには、サインインが必要です。
          </Header.Subheader>
        </Header>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </Segment>
    </Layout>
  );
}
