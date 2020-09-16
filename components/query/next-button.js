import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Icon } from 'semantic-ui-react';

export default function QueryNextButton({ cursor }) {
  if (!cursor) return null;

  const router = useRouter();
  const [, pathname] = router.asPath.match(/^(.+?)(?:\?.+)?$/);

  const query = { ...router.query, t: cursor };
  delete query.userId;

  return (
    <Link href={{ pathname: router.pathname, query }} as={{ pathname, query }}>
      <a>
        <Button fluid>
          Next
          <Icon name="angle right" />
        </Button>
      </a>
    </Link>
  );
}
