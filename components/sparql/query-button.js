import { Button } from 'semantic-ui-react';

export default function SparqlQueryButton(props) {
  return (
    <Button
      positive
      content="Query"
      icon="play"
      labelPosition="left"
      {...props}
    />
  );
}
