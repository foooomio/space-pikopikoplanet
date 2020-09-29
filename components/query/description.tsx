import Link from 'next/link';
import { List, Label } from 'semantic-ui-react';

type Props = {
  endpoint: string;
  tags: string[];
};

const QueryDescription = ({ endpoint, tags }: Props) => {
  return (
    <List style={{ overflow: 'auto' }}>
      <List.Item>
        <Link
          href={`/search?endpoint=${encodeURIComponent(endpoint)}`}
          passHref
        >
          <Label basic icon="compass outline" content={endpoint} />
        </Link>
      </List.Item>
      <List.Item>
        <Label.Group>
          {tags.map((tag) => (
            <Link href={`/search?tag=${tag}`} passHref key={tag}>
              <Label basic icon="tag" content={tag} />
            </Link>
          ))}
        </Label.Group>
      </List.Item>
    </List>
  );
};

export default QueryDescription;
