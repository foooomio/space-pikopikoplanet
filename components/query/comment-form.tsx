import { Comment, Header, Form, Message, Button } from 'semantic-ui-react';
import QueryComment from '@/components/query/comment';
import { useCommentForm } from '@/hooks/use-comment-form';

type Props = {
  queryId: string;
};

const QueryCommentForm = ({ queryId }: Props) => {
  const {
    comments,
    errors,
    processing,
    text,
    setText,
    handleSubmit,
    handleDelete,
  } = useCommentForm(queryId);

  return (
    <Comment.Group>
      <Header as="h3">Comments</Header>

      {comments?.map((comment) => (
        <QueryComment
          {...comment}
          onDelete={() => handleDelete(comment.commentId)}
          key={comment.commentId}
        />
      ))}

      <Form>
        {errors.length !== 0 && <Message error header="エラー" list={errors} />}
        <Form.TextArea
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          style={{ marginTop: '1rem' }}
        />
        <Button
          primary
          icon="comment alternate"
          labelPosition="left"
          content="Comment"
          onClick={handleSubmit}
          loading={processing}
        />
      </Form>
    </Comment.Group>
  );
};

export default QueryCommentForm;
