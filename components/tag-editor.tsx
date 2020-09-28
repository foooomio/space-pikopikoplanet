import { useState, useRef } from 'react';
import { Input, Button, Label, Icon, Divider } from 'semantic-ui-react';
import type { KeyboardEvent } from 'react';
import type { InputWithRef } from '@/lib/types';

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
  const inputRef = useRef<InputWithRef>(null);
  const [inputError, setInputError] = useState<string | null>(null);

  const handleAdd = () => {
    const value = inputRef.current!.inputRef.current!.value;
    const error = validateTag(value);
    if (error) {
      setInputError(error);
    } else {
      addTag(value);
      setInputError(null);
      inputRef.current!.inputRef.current!.value = '';
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
        onKeyPress={handleKeyPress}
        ref={inputRef}
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
