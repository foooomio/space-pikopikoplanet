import { useEffect } from 'react';
import { SWRConfig } from 'swr';
import { Container } from 'semantic-ui-react';
import Navbar from '@/components/common/navbar';
import Footer from '@/components/common/footer';
import PageLoader from '@/components/common/page-loader';
import { UserProvider } from '@/lib/user-context';
import firebase from '@/lib/firebase';
import type { FunctionComponent } from 'react';

type Props = {
  hero?: JSX.Element;
};

const Layout: FunctionComponent<Props> = ({ children, hero }) => {
  useEffect(() => {
    if (navigator.userAgent.indexOf('Trident') !== -1) {
      location.href = 'https://www.microsoft.com/ja-jp/edge';
    } else {
      firebase.analytics().logEvent('page_view', {});
    }
  }, []);

  const swrConfig = {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  };

  return (
    <SWRConfig value={swrConfig}>
      <UserProvider>
        <Navbar />
        {hero}
        <Container as="main">{children}</Container>
        <Footer />
        <PageLoader />
      </UserProvider>
    </SWRConfig>
  );
};

export default Layout;
