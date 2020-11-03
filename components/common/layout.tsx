import { useEffect } from 'react';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import { Container } from 'semantic-ui-react';
import Navbar from '@/components/common/navbar';
import Footer from '@/components/common/footer';
import PageLoader from '@/components/common/page-loader';
import { UserProvider } from '@/lib/user-context';
import firebase from '@/lib/firebase';
import type { FunctionComponent, ReactNode } from 'react';

const script = `if (navigator.userAgent.indexOf('Trident') !== -1) location.href = 'https://www.microsoft.com/ja-jp/edge';`;
const style = 'body { background: aliceblue !important; }';

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
      <UserProvider>
        <Navbar />
        {hero}
        <Container as="main">{children}</Container>
        <Footer />
        <PageLoader />
        <Head>
          <script dangerouslySetInnerHTML={{ __html: script }} />
          <style dangerouslySetInnerHTML={{ __html: style }} />
          <link
            href="https://fonts.googleapis.com/earlyaccess/nicomoji.css"
            rel="stylesheet"
          />
        </Head>
      </UserProvider>
    </SWRConfig>
  );
};

export default Layout;
