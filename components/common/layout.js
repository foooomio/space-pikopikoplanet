import { Container } from 'semantic-ui-react';
import Navbar from '@/components/common/navbar';
import Footer from '@/components/common/footer';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Container as="main">{children}</Container>
      <Footer />
    </>
  );
}
