import { useState, useEffect, forwardRef } from 'react';
import { Input } from 'semantic-ui-react';
import { fetchEndpointList } from '@/lib/database';

const SparqlEndpointInput = forwardRef((props, ref) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (props.defaultValue) return;
    fetchEndpointList().then((data) => setList(data));
  }, []);

  return (
    <>
      <Input
        type="url"
        list="endpoint-list"
        placeholder="Endpoint"
        icon="compass outline"
        iconPosition="left"
        fluid
        transparent
        {...props}
        ref={ref}
      />
      <datalist id="endpoint-list">
        {list.map((endpoint) => (
          <option value={endpoint} key={endpoint} />
        ))}
      </datalist>
    </>
  );
});

export default SparqlEndpointInput;
