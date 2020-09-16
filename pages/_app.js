import '@/styles/globals.css';
import 'semantic-ui-css/semantic.min.css';
import 'codemirror/lib/codemirror.css';

import UserProvider from '@/lib/user-context';
import firebase from '@/lib/firebase';

function MyApp({ Component, pageProps }) {
  if (typeof window !== 'undefined') {
    firebase.analytics().logEvent('page_view');
  }

  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
