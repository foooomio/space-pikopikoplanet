import React, { useRef } from 'react';
import { Input, Button, Divider, Message } from 'semantic-ui-react';
import SparqlEditor from '@/components/sparql/editor';
import TagEditor from '@/components/tag-editor';
import { useComposeForm } from '@/hooks/use-compose-form';

type Props = {
  editId: string;
};

const ComposeForm: React.FC<Props> = ({ editId }) => {
  const sparqlEditor = useRef<React.ElementRef<typeof SparqlEditor>>(null);

  const {
    form,
    processing,
    errors,
    setTitle,
    addTag,
    deleteTag,
    handleSubmit,
  } = useComposeForm(editId, sparqlEditor);

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
