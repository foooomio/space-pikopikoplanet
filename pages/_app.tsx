import { SWRConfig } from 'swr';
import UserProvider from '@/lib/user-context';
import firebase from '@/lib/firebase';
import type { AppProps } from 'next/app';

import '@/styles/globals.css';
import 'semantic-ui-css/semantic.min.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/hint/show-hint.css';
import 'github-markdown-css/github-markdown.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  if (
    typeof navigator !== 'undefined' &&
    navigator.userAgent.indexOf('Trident') !== -1
  ) {
    location.href = 'https://www.microsoft.com/ja-jp/edge';
  }

  if (typeof window !== 'undefined') {
    firebase.analytics().logEvent('page_view', {});
  }

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
      }}
    >
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </SWRConfig>
  );
};

export default MyApp;
