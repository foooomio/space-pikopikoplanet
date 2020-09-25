import React from 'react';
import { Container } from 'semantic-ui-react';
import Navbar from '@/components/common/navbar';
import Footer from '@/components/common/footer';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container as="main">{children}</Container>
      <Footer />
    </>
  );
};

export default Layout;
