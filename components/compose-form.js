import { useRef, useState } from 'react';
import { Input, Button, Divider, Message } from 'semantic-ui-react';
import SparqlComposer from '@/components/sparql/composer';
import TagEditor from '@/components/tag-editor';
import { useUser } from '@/lib/user-context';
import { fetchUser, saveQuery } from '@/lib/database';
import { generateId } from '@/lib/util';

const validateTitle = (title) => {
  if (title.length === 0) {
    return 'タイトルが入力されていません。';
  }
  return null;
};

const validateEndpoint = (endpoint) => {
  if (endpoint.length === 0) {
    return 'エンドポイントが入力されていません。';
  }
  return null;
};

const validateQuery = (query) => {
  if (query.length === 0) {
    return 'クエリが入力されていません。';
  }
  return null;
};

export default function ComposeForm({
  queryId,
  title,
  authorUid,
  endpoint,
  query,
  tags,
  createdAt,
}) {
  const [user] = useUser();

  const titleRef = useRef(null);
  const composer = useRef(null);
  const tagEditor = useRef(null);

  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async () => {
    setProcessing(true);

    const data = {
      queryId: queryId ?? generateId(),
      authorUid: user.uid,
      title: titleRef.current.inputRef.current.value,
      endpoint: composer.current.endpoint(),
      query: composer.current.query(),
      tags: tagEditor.current.tags(),
      createdAt: createdAt ?? Date.now(),
      updateAt: Date.now(),
    };

    let newErrors = [
      validateTitle(data.title),
      validateEndpoint(data.endpoint),
      validateQuery(data.query),
    ];

    if (!authorUid) {
      const { userId, userName } = await fetchUser(user.uid);
      if (userId && userName) {
        data.authorId = userId;
        data.authorName = userName;
      } else {
        newErrors.unshift('ユーザーIDまたはユーザー名が設定されていません。');
      }
    }

    newErrors = newErrors.filter((e) => e !== null);

    if (newErrors.length === 0) {
      await saveQuery(data.queryId, data);
      location.href = `/query/${data.queryId}`;
    }

    setErrors(newErrors);
    setProcessing(false);
  };

  return (
    <>
      {errors.length !== 0 && <Message error header="エラー" list={errors} />}

      <Input fluid defaultValue={title} placeholder="Title" ref={titleRef} />

      <SparqlComposer endpoint={endpoint} query={query} ref={composer} />

      <TagEditor tags={tags} ref={tagEditor} />

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
