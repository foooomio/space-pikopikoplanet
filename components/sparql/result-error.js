import { Segment, Header } from 'semantic-ui-react';

export default function SparqlResultError({ error }) {
  if (!error) return null;

  return (
    <Segment inverted color="red" attached="bottom">
      <Header
        icon="exclamation triangle"
        size="medium"
        content={`Error - ${error.message}`}
      />
    </Segment>
  );
}
