import Link from 'next/link';
import { List, Label } from 'semantic-ui-react';

type Props = {
  endpoint: string;
  tags: string[];
};

const QueryDescription = ({ endpoint, tags }: Props) => {
  return (
    <List>
      <List.Item>
        <List.Icon name="compass outline" />
        <Link
          href={`/search?endpoint=${encodeURIComponent(endpoint)}`}
          passHref
        >
          <Label basic content={endpoint} />
        </Link>
      </List.Item>
      <List.Item>
        <List.Icon name="tags" />
        <Label.Group>
          {tags.map((tag) => (
            <Link href={`/search?tag=${tag}`} passHref key={tag}>
              <Label as="a" basic content={tag} />
            </Link>
          ))}
        </Label.Group>
      </List.Item>
    </List>
  );
};

export default QueryDescription;
