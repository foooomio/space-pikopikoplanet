import { Segment, Header } from 'semantic-ui-react';

type Props = {
  error: Error;
};

const SparqlResultError = ({ error }: Props) => {
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
