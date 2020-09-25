import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Modal, Button } from 'semantic-ui-react';
import { deleteQuery } from '@/lib/database';

type Props = {
  queryId: string;
};

const QueryDeleteButton: React.FC<Props> = ({ queryId }) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    await deleteQuery(queryId);
    router.replace('/');
  };

  return (
    <Modal
      size="tiny"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button icon="trash alternate outline" color="red" circular basic />
      }
    >
      <Modal.Header>削除確認</Modal.Header>
      <Modal.Content>
        <Modal.Description>本当に削除しますか？</Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button content="Cancel" onClick={() => setOpen(false)} />
        <Button negative content="Delete" onClick={handleDelete} />
      </Modal.Actions>
    </Modal>
  );
};

export default QueryDeleteButton;
