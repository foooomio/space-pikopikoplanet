import { useRef } from 'react';
import { Input, Button, Divider, Message } from 'semantic-ui-react';
import SparqlEditor from '@/components/sparql/editor';
import TagEditor from '@/components/tag-editor';
import { useComposeForm } from '@/hooks/use-compose-form';

export default function ComposeForm() {
  const sparqlEditor = useRef(null);

  const {
    form,
    processing,
    errors,
    setTitle,
    addTag,
    deleteTag,
    handleSubmit,
  } = useComposeForm(sparqlEditor);

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
        icon="cloud upload"
        labelPosition="left"
        floated="right"
        onClick={handleSubmit}
        loading={processing}
      />
    </>
  );
}
