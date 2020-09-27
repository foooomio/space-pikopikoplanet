import Link from 'next/link';
import { Segment, Header, Button } from 'semantic-ui-react';

const Hero = () => {
  return (
    <Segment inverted vertical textAlign="center" id="hero">
      <Header size="huge">☆ピコピコプラネット☆ SPACE へようこそ</Header>
      <Header size="large">SPARQLクエリを共有しましょう</Header>
      <Segment.Inline>
        <Link href="/compose">
          <a>
            <Button color="teal" size="big" content="新規作成" />
          </a>
        </Link>
      </Segment.Inline>
    </Segment>
  );
};

export default Hero;
