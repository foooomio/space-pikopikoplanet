import { Container } from 'semantic-ui-react';
import Navbar from '@/components/common/navbar';
import Footer from '@/components/common/footer';
import Hero from '@/components/common/hero';
import type { FunctionComponent } from 'react';

type Props = {
  hero?: boolean;
};

const Layout: FunctionComponent<Props> = ({ children, hero }) => {
  return (
    <>
      <Navbar />
      {hero && <Hero />}
      <Container as="main">{children}</Container>
      <Footer />
    </>
  );
};

export default Layout;
