import { useState, useEffect } from 'react';
import { Input } from 'semantic-ui-react';
import { fetchEndpointList } from '@/lib/database';
import type { ChangeEvent } from 'react';

type Props = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SparqlEndpointInput = ({ value, onChange }: Props) => {
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    if (!value) {
      fetchEndpointList().then((data) => setList(data));
    }
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
        value={value}
        onChange={onChange}
      />
      <datalist id="endpoint-list">
        {list.map((endpoint) => (
          <option value={endpoint} key={endpoint} />
        ))}
      </datalist>
    </>
  );
};

export default SparqlEndpointInput;
