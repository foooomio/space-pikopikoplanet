import { Button } from 'semantic-ui-react';
import { BASE_URL } from '@/lib/constants';

type Props = {
  queryId: string;
  title: string;
  authorName: string;
};

const TweetButton = ({ queryId, title, authorName }: Props) => {
  const url = new URL(`/query/${queryId}`, BASE_URL);
  const text = `${title} by ${authorName} #ピコピコプラネットSPACE`;

  const tweet = new URL('https://twitter.com/intent/tweet');
  tweet.searchParams.set('text', text);
  tweet.searchParams.set('url', url.toString());
  const href = tweet.toString();

  return (
    <a href={href} target="_blank" rel="nofollow noopener noreferrer">
      <Button color="twitter" icon="twitter" circular />
    </a>
  );
};

export default TweetButton;
