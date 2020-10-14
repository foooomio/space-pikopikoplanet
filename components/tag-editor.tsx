import { useState } from 'react';
import { Input, Button, Label, Icon, Divider } from 'semantic-ui-react';
import type { KeyboardEvent } from 'react';

const invalidChars = ' !"#$%&\'()*+,./;<=>?[\\]^`{|}~';

const validateTag = (value: string): string | null => {
  if (value.length === 0) {
    return '入力されていません。';
  }
  if ([...invalidChars].some((s) => value.includes(s))) {
    return `次の文字は使えません。${invalidChars}`;
  }
  return null;
};

type Props = {
  tags: string[];
  addTag: (tag: string) => void;
  deleteTag: (tag: string) => void;
};

const TagEditor = ({ tags, addTag, deleteTag }: Props) => {
  const [input, setInput] = useState('');
  const [inputError, setInputError] = useState<string | null>(null);

  const handleAdd = () => {
    const error = validateTag(input);
    if (error) {
      setInputError(error);
    } else {
      addTag(input);
      setInputError(null);
      setInput('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <>
      <Input
        placeholder="Enter tags"
        icon="tags"
        iconPosition="left"
        action={<Button basic content="Add" onClick={handleAdd} />}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      {inputError && (
        <Label pointing="left" color="red" basic content={inputError} />
      )}

      <Divider hidden />

      <Label.Group>
        {tags.map((tag) => (
          <Label basic key={tag}>
            {tag}
            <Icon name="delete" onClick={() => deleteTag(tag)} />
          </Label>
        ))}
      </Label.Group>
    </>
  );
};

export default TagEditor;
