import { Button } from 'semantic-ui-react';

type Props = {
  [key: string]: any;
};

const SparqlQueryButton = (props: Props) => {
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
