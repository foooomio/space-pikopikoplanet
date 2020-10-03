import { Container } from 'semantic-ui-react';
import Navbar from '@/components/common/navbar';
import Footer from '@/components/common/footer';
import type { FunctionComponent } from 'react';

type Props = {
  hero?: JSX.Element;
};

const Layout: FunctionComponent<Props> = ({ children, hero }) => {
  return (
    <>
      <Navbar />
      {hero}
      <Container as="main">{children}</Container>
      <Footer />
    </>
  );
};

export default Layout;
