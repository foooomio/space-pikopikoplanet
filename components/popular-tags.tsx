import Link from 'next/link';
import useSWR from 'swr';
import { Label } from 'semantic-ui-react';
import { fetchAllQueriesByEndpoint } from '@/lib/database';
import { tally } from '@/lib/util';
import { NUMBER_IN_POPULAR_TAGS } from '@/lib/constants';

type Props = {
  endpoint: string;
};

const PopularTags = ({ endpoint }: Props) => {
  const { data, error } = useSWR(['popularTags', endpoint], () =>
    fetchAllQueriesByEndpoint(endpoint)
  );

  if (error) {
    console.error(error);
  }

  const tags = data?.flatMap((query) => query.tags) ?? [];

  return (
    <Label.Group>
      {Object.entries(tally(tags))
        .slice(0, NUMBER_IN_POPULAR_TAGS)
        .map(([tag, count]) => (
          <Link
            href={`/search?endpoint=${endpoint}&tag=${tag}`}
            passHref
            key={tag}
          >
            <Label basic icon="tag" content={tag} detail={count} />
          </Link>
        ))}
    </Label.Group>
  );
};

export default PopularTags;
