import React from 'react';
import { Segment, Header } from 'semantic-ui-react';

type Props = {
  error: Error | null;
};

const SparqlResultError: React.FC<Props> = ({ error }) => {
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
};

export default SparqlResultError;
