import { Card, Divider } from 'semantic-ui-react';
import QueryCard from '@/components/query/card';
import QueryNextButton from '@/components/query/next-button';
import { NUMBER_IN_QUERY_LIST } from '@/lib/constants';

export default function QueryList({ queries }) {
  if (queries.length === 0) return null;

  let cursor = null;
  if (queries.length === NUMBER_IN_QUERY_LIST + 1) {
    cursor = queries[NUMBER_IN_QUERY_LIST - 1].createdAt;
    queries = queries.slice(0, -1);
  }

  return (
    <>
      <Card.Group itemsPerRow={2} stackable>
        {queries.map((props) => (
          <QueryCard {...props} key={props.queryId} />
        ))}
      </Card.Group>
      <Divider hidden />
      <QueryNextButton cursor={cursor} />
    </>
  );
}
