import { Container } from 'semantic-ui-react';
import Navbar from '@/components/common/navbar';
import Footer from '@/components/common/footer';
import type { FunctionComponent } from 'react';

const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container as="main">{children}</Container>
      <Footer />
    </>
  );
};

export default Layout;
