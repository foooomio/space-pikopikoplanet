import Link from 'next/link';
import useSWR from 'swr';
import { Label } from 'semantic-ui-react';
import { fetchAllQueries, fetchAllQueriesByEndpoint } from '@/lib/database';
import { tally } from '@/lib/util';
import { NUMBER_IN_POPULAR_TAGS } from '@/lib/constants';

type Props = {
  endpoint?: string;
};

const PopularTags = ({ endpoint }: Props) => {
  const { data, error } = useSWR(['popularTags', endpoint], () =>
    endpoint ? fetchAllQueriesByEndpoint(endpoint) : fetchAllQueries()
  );

  if (error) {
    console.error(error);
  }

  const tags = data?.flatMap((query) => query.tags) ?? [];

  return (
    <Label.Group>
      {Object.entries(tally(tags))
        .sort((a, b) => b[1] - a[1])
        .slice(0, NUMBER_IN_POPULAR_TAGS)
        .map(([tag, count]) => {
          let href = `/search?tag=${tag}`;
          if (endpoint) {
            href += `&endpoint=${encodeURIComponent(endpoint)}`;
          }
          return (
            <Link href={href} passHref key={tag}>
              <Label basic icon="tag" content={tag} detail={count} />
            </Link>
          );
        })}
    </Label.Group>
  );
};

export default PopularTags;
