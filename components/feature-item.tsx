import Link from 'next/link';
import { List } from 'semantic-ui-react';

type Props = {
  id: string;
  title: string;
  caption: string;
};

const FeatureItem = ({ id, title, caption }: Props) => {
  return (
    <List.Item>
      <List.Icon name="star outline" style={{ verticalAlign: 'middle' }} />
      <List.Content>
        <List.Header as="h4">
          <Link href={`/feature/${id}`}>
            <a>{title}</a>
          </Link>
        </List.Header>
        <List.Description>{caption}</List.Description>
      </List.Content>
    </List.Item>
  );
};

export default FeatureItem;
