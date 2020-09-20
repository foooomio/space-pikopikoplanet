import {
  useState,
  useReducer,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
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

const reducer = (state, action) => {
  const set = new Set(state);
  switch (action.type) {
    case 'set':
      action.payload.forEach((tag) => set.add(tag));
      return [...set];
    case 'add':
      set.add(action.payload);
      return [...set];
    case 'delete':
      set.delete(action.payload);
      return [...set];
  }
};

const TagEditor = forwardRef((props, ref) => {
  const inputRef = useRef(null);
  const [inputError, setInputError] = useState(null);
  const [tags, dispatch] = useReducer(reducer, props.tags);

  useEffect(() => {
    dispatch({ type: 'set', payload: props.tags });
  }, [props.tags]);

  useImperativeHandle(ref, () => ({
    tags: () => tags,
  }));

  const handleAdd = () => {
    const value = inputRef.current.inputRef.current.value;
    const error = validateTag(value);
    if (error) {
      setInputError(error);
    } else {
      dispatch({ type: 'add', payload: value });
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
            <Icon
              name="delete"
              onClick={() => dispatch({ type: 'delete', payload: tag })}
            />
          </Label>
        ))}
      </Label.Group>
    </>
  );
});

export default TagEditor;
