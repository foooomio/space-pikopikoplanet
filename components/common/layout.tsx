import { useEffect } from 'react';
import { SWRConfig } from 'swr';
import { Container } from 'semantic-ui-react';
import Navbar from '@/components/common/navbar';
import Footer from '@/components/common/footer';
import PageLoader from '@/components/common/page-loader';
import firebase from '@/lib/firebase';
import type { FunctionComponent, ReactNode } from 'react';

type Props = {
  hero?: ReactNode;
};

const Layout: FunctionComponent<Props> = ({ children, hero }) => {
  useEffect(() => {
    firebase.analytics().logEvent('page_view', {});
  }, []);

  const swrConfig = {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  };

  return (
    <SWRConfig value={swrConfig}>
      <Navbar />
      {hero}
      <Container as="main">{children}</Container>
      <Footer />
      <PageLoader />
    </SWRConfig>
  );
};

export default Layout;
