import { useRouter } from 'next/router';
import { Button } from 'semantic-ui-react';
import { BASE_URL } from '@/lib/constants';

type Props = {
  title: string;
  authorName: string;
};

const TweetButton = ({ title, authorName }: Props) => {
  const { asPath } = useRouter();

  const text = `${title} by ${authorName} #ピコピコプラネットSPACE`;

  const tweet = new URL('https://twitter.com/intent/tweet');
  tweet.searchParams.set('text', text);
  tweet.searchParams.set('url', new URL(asPath, BASE_URL).toString());
  const href = tweet.toString();

  return (
    <a href={href} target="_blank" rel="nofollow noopener noreferrer">
      <Button color="twitter" icon="twitter" circular />
    </a>
  );
};

export default TweetButton;
