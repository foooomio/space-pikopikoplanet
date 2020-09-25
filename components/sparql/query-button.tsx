import React from 'react';
import { Button } from 'semantic-ui-react';

type Props = {
  [P in string]: any;
};

const SparqlQueryButton: React.FC<Props> = (props) => {
  return (
    <Button
      positive
      content="Query"
      icon="play"
      labelPosition="left"
      {...props}
    />
  );
};

export default SparqlQueryButton;
