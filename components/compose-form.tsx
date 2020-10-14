import { Input, Button, Divider, Message } from 'semantic-ui-react';
import SparqlEditor from '@/components/sparql/editor';
import TagEditor from '@/components/tag-editor';
import { useComposeForm } from '@/hooks/use-compose-form';

type Props = {
  editId: string | null;
  forkId: string | null;
  endpoint: string | null;
  query: string | null;
};

const ComposeForm = ({ editId, forkId, endpoint, query }: Props) => {
  const {
    form,
    processing,
    errors,
    setTitle,
    setEndpoint,
    setQuery,
    addTag,
    deleteTag,
    handleSubmit,
  } = useComposeForm({ editId, forkId, endpoint, query });

  return (
    <>
      {errors.length !== 0 && <Message error header="エラー" list={errors} />}

      <Input
        fluid
        placeholder="Title"
        value={form.title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <SparqlEditor
        endpoint={form.endpoint}
        query={form.query}
        onEndpointChange={(value) => setEndpoint(value)}
        onQueryChange={(value) => setQuery(value)}
      />

      <TagEditor tags={form.tags} addTag={addTag} deleteTag={deleteTag} />

      <Divider />

      <span>
        投稿されたクエリには{' '}
        <a href="https://creativecommons.org/licenses/by/4.0/deed.ja">
          CC BY 4.0
        </a>{' '}
        が付与されます。
      </span>

      <Button
        primary
        type="submit"
        content="Submit"
        icon="paper plane"
        labelPosition="left"
        floated="right"
        onClick={handleSubmit}
        loading={processing}
      />
    </>
  );
};

export default ComposeForm;
