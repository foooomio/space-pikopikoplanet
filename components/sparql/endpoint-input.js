import { forwardRef } from 'react';
import { Input } from 'semantic-ui-react';

const SparqlEndpointInput = forwardRef((props, ref) => {
  return (
    <Input
      type="url"
      placeholder="Endpoint"
      icon="compass outline"
      iconPosition="left"
      fluid
      transparent
      {...props}
      ref={ref}
    />
  );
});

export default SparqlEndpointInput;
