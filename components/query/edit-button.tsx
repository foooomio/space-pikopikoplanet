import React from 'react';
import Link from 'next/link';
import { Button } from 'semantic-ui-react';

type Props = {
  queryId: string;
};

const QueryEditButton: React.FC<Props> = ({ queryId }) => {
  return (
    <Link href={`/compose?edit=${queryId}`}>
      <a>
        <Button icon="edit outline" color="teal" circular basic />
      </a>
    </Link>
  );
};

export default QueryEditButton;
