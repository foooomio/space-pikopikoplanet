import { useState, useRef } from 'react';
import { Input, Button, Label, Icon, Divider } from 'semantic-ui-react';

const invalidChars = ' !"#$%&\'()*+,./;<=>?[\\]^`{|}~';

const validateTag = (value) => {
  if (value.length === 0) {
    return '入力されていません。';
  }
  if ([...invalidChars].some((s) => value.includes(s))) {
    return `次の文字は使えません。${invalidChars}`;
  }
  return null;
};

export default function TagEditor({ tags, addTag, deleteTag }) {
  const inputRef = useRef(null);
  const [inputError, setInputError] = useState(null);

  const handleAdd = () => {
    const value = inputRef.current.inputRef.current.value;
    const error = validateTag(value);
    if (error) {
      setInputError(error);
    } else {
      addTag(value);
      setInputError(null);
      inputRef.current.inputRef.current.value = null;
    }
  };

  const handleKeyPress = (e) => {
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

      <Label.Group tag>
        {tags.map((tag) => (
          <Label key={tag}>
            {tag}
            <Icon name="delete" onClick={() => deleteTag(tag)} />
          </Label>
        ))}
      </Label.Group>
    </>
  );
}
