import { Button } from 'semantic-ui-react';

type Props = {
  [key: string]: any;
};

const SparqlForkButton = (props: Props) => {
  return (
    <Button
      basic
      color="grey"
      content="Fork"
      icon="fork"
      labelPosition="left"
      {...props}
    />
  );
};

export default SparqlForkButton;
