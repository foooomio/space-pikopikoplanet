import Link from 'next/link';
import { Container, List } from 'semantic-ui-react';

const Footer = () => {
  return (
    <Container as="footer" textAlign="center">
      <List horizontal celled>
        <List.Item>
          <Link href="/terms-of-service">
            <a>利用規約</a>
          </Link>
        </List.Item>
        <List.Item>
          <Link href="/privacy-policy">
            <a>プライバシーポリシー</a>
          </Link>
        </List.Item>
        <List.Item>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSfgtOA9Vh6PCkQi95B7T8_nX0NuOabW5t_KSJN7tkAQliS9Ow/viewform">
            お問い合わせ
          </a>
        </List.Item>
        <List.Item>
          <a href="https://mltd.pikopikopla.net/">☆ピコピコプラネット☆</a>
        </List.Item>
      </List>
    </Container>
  );
};

export default Footer;
