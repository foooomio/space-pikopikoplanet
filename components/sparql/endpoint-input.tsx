import { useState, useEffect, forwardRef } from 'react';
import { Input } from 'semantic-ui-react';
import { fetchEndpointList } from '@/lib/database';
import type { InputWithRef } from '@/lib/types';

type Props = {
  defaultValue?: string;
};

const SparqlEndpointInput = forwardRef<InputWithRef, Props>((props, ref) => {
  const [list, setList] = useState<string[]>([]);

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
