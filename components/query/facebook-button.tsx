import { Button } from 'semantic-ui-react';
import { BASE_URL } from '@/lib/constants';

type Props = {
  queryId: string;
};

const QueryFacebookButton = ({ queryId }: Props) => {
  const url = new URL(`/query/${queryId}`, BASE_URL);

  const sharer = new URL('https://www.facebook.com/sharer/sharer.php');
  sharer.searchParams.set('u', url.toString());
  const href = sharer.toString();

  return (
    <a href={href} target="_blank" rel="nofollow noopener noreferrer">
      <Button color="facebook" icon="facebook" circular />
    </a>
  );
};

export default QueryFacebookButton;
