import Link from 'next/link';
import { Button } from 'semantic-ui-react';

export default function QueryEditButton({ queryId }) {
  return (
    <Link href={`/compose?edit=${queryId}`}>
      <a>
        <Button icon="edit outline" color="teal" circular basic />
      </a>
    </Link>
  );
}
