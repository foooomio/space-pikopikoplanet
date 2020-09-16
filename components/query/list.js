import { Grid } from 'semantic-ui-react';
import QueryCard from '@/components/query/card';
import QueryNextButton from '@/components/query/next-button';
import { NUMBER_IN_QUERY_LIST } from '@/lib/constants';
import { unflat } from '@/lib/util';

export default function QueryList({ queries }) {
  if (queries.length === 0) return null;

  let cursor = null;
  if (queries.length === NUMBER_IN_QUERY_LIST + 1) {
    cursor = queries[NUMBER_IN_QUERY_LIST - 1].createdAt;
    queries = queries.slice(0, -1);
  }

  return (
    <Grid stackable>
      {unflat(queries, 2).map((pair, index) => (
        <Grid.Row columns={2} key={index}>
          {pair.map((props) => (
            <Grid.Column key={props.queryId}>
              <QueryCard {...props} />
            </Grid.Column>
          ))}
        </Grid.Row>
      ))}
      <Grid.Row>
        <Grid.Column textAlign="center">
          <QueryNextButton cursor={cursor} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
