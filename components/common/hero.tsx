import Link from 'next/link';
import { Segment, Container, Header, Button, Icon } from 'semantic-ui-react';

type Props = {
  title: string;
  subtitle?: string;
  description?: string;
  endpoint?: string;
  website?: string;
  inverted?: boolean;
  style?: object;
  index?: boolean;
};

const Hero = ({
  title,
  subtitle,
  description,
  endpoint,
  website,
  inverted,
  style,
  index,
}: Props) => {
  const button = index ? '新規作成' : `${title}のクエリを新規作成`;
  const href = endpoint
    ? `/compose?endpoint=${encodeURIComponent(endpoint)}`
    : '/compose';

  return (
    <Segment
      inverted={inverted}
      vertical
      id={index && 'index'}
      className="hero"
      style={style}
    >
      <Container text>
        <Header size="huge">{title}</Header>
        {subtitle && <Header size="large">{subtitle}</Header>}
        {description && <Header size="small">{description}</Header>}
        {website && (
          <div className="website">
            <Icon name="home" />
            <a href={website}>{website}</a>
          </div>
        )}
        <Segment.Inline>
          <Link href={href}>
            <a>
              <Button color="teal" size="big" content={button} />
            </a>
          </Link>
        </Segment.Inline>
      </Container>
    </Segment>
  );
};

export default Hero;
