import { useRouter } from 'next/router';
import { Button } from 'semantic-ui-react';
import { BASE_URL } from '@/lib/constants';

export default function FacebookButton() {
  const { asPath } = useRouter();

  const sharer = new URL('https://www.facebook.com/sharer/sharer.php');
  sharer.searchParams.set('u', new URL(asPath, BASE_URL));

  return (
    <a href={sharer} target="_blank" rel="nofollow noopener noreferrer">
      <Button color="facebook" icon="facebook" circular />
    </a>
  );
}
