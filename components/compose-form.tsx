import { useRef } from 'react';
import { Input, Button, Divider, Message } from 'semantic-ui-react';
import SparqlEditor from '@/components/sparql/editor';
import TagEditor from '@/components/tag-editor';
import { useComposeForm } from '@/hooks/use-compose-form';
import type { ElementRef } from 'react';

type Props = {
  editId: string | null;
  forkId: string | null;
  endpoint: string | null;
  query: string | null;
};

const ComposeForm = ({ editId, forkId, endpoint, query }: Props) => {
  const sparqlEditor = useRef<ElementRef<typeof SparqlEditor>>(null);

  const {
    form,
    processing,
    errors,
    setTitle,
    addTag,
    deleteTag,
    handleSubmit,
  } = useComposeForm(sparqlEditor, { editId, forkId, endpoint, query });

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
        ref={sparqlEditor}
      />

      <TagEditor tags={form.tags} addTag={addTag} deleteTag={deleteTag} />

      <Divider />

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
