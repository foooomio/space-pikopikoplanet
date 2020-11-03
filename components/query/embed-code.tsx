import { useState, useRef } from 'react';
import { Modal, Button, Popup, Form, TextArea, Ref } from 'semantic-ui-react';
import { BASE_URL } from '@/lib/constants';

type Props = {
  queryId: string;
};

const QueryEmbedCode = ({ queryId }: Props) => {
  const code = `<iframe src="${BASE_URL}/embed/${queryId}" class="space-pikopikoplanet-embed" style="border: 0; overflow: hidden; width: 100%; height: 457px;"></iframe><script defer src="${BASE_URL}/embed.js"></script>`;

  const [open, setOpen] = useState<boolean>(false);

  const textarea = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    if (textarea.current) {
      textarea.current.select();
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button icon="code" labelPosition="left" content="Embed code" />}
    >
      <Modal.Header>Embed code</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Ref innerRef={textarea}>
              <TextArea readOnly value={code} />
            </Ref>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button content="Close" onClick={() => setOpen(false)} />
        <Popup
          trigger={
            <Button
              color="teal"
              icon="copy"
              labelPosition="left"
              content="Copy"
              onClick={handleCopy}
            />
          }
          content="Copied!"
          position="top center"
          on="click"
          open={copied}
          inverted
        />
      </Modal.Actions>
    </Modal>
  );
};

export default QueryEmbedCode;
