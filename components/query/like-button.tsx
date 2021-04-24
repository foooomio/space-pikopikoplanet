import { Button } from 'semantic-ui-react';
import { useUser } from '@/hooks/use-user';
import { useLikeButton } from '@/hooks/use-like-button';

type Props = {
  queryId: string;
  queryAuthorUid: string;
};

const QueryLikeButton = ({ queryId, queryAuthorUid }: Props) => {
  const { user } = useUser();

  const { likeCount, likedByUser, handleLike, handleUnlike } = useLikeButton(
    queryId,
    queryAuthorUid
  );

  const loading = likeCount === null;

  if (!user) {
    return (
      <Button
        basic
        icon="heart outline"
        disabled
        content={likeCount ?? 0}
        loading={loading}
      />
    );
  }

  if (likedByUser) {
    return (
      <Button
        basic
        icon="heart"
        color="red"
        content={likeCount ?? 0}
        loading={loading}
        onClick={handleUnlike}
      />
    );
  } else {
    return (
      <Button
        basic
        icon="heart outline"
        content={likeCount ?? 0}
        loading={loading}
        onClick={handleLike}
      />
    );
  }
};

export default QueryLikeButton;
