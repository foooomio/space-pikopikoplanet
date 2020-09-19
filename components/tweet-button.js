import { useRouter } from 'next/router';
import { Button } from 'semantic-ui-react';
import { SITE_TITLE, BASE_URL } from '@/lib/constants';

export default function TweetButton({ title, authorName }) {
  const { asPath } = useRouter();

  const text = `${title} by ${authorName} #ピコピコプラネットSPACE`;

  const tweet = new URL('https://twitter.com/intent/tweet');
  tweet.searchParams.set('text', text);
  tweet.searchParams.set('url', new URL(asPath, BASE_URL));

  return (
    <a href={tweet} target="_blank" rel="nofollow noopener noreferrer">
      <Button color="twitter" icon="twitter" circular />
    </a>
  );
}
