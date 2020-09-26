import { useRouter } from 'next/router';
import { Button } from 'semantic-ui-react';
import { BASE_URL } from '@/lib/constants';

const FacebookButton = () => {
  const { asPath } = useRouter();

  const sharer = new URL('https://www.facebook.com/sharer/sharer.php');
  sharer.searchParams.set('u', new URL(asPath, BASE_URL).toString());
  const href = sharer.toString();

  return (
    <a href={href} target="_blank" rel="nofollow noopener noreferrer">
      <Button color="facebook" icon="facebook" circular />
    </a>
  );
};

export default FacebookButton;
