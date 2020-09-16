import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Segment,
  Header,
  Input,
  Button,
  Divider,
  Message,
} from 'semantic-ui-react';
import Layout from '@/components/common/layout';
import Head from '@/components/common/head';
import SparqlComposer from '@/components/sparql/composer';
import TagEditor from '@/components/tag-editor';
import { useUser } from '@/lib/user-context';
import { fetchQuery, fetchUser, saveQuery } from '@/lib/database';
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

export default function ComposePage({
  queryId,
  title,
  authorUid,
  endpoint,
  query,
  tags,
  createdAt,
}) {
  const [user, loading] = useUser();

  if (typeof window !== 'undefined' && !loading && !user) {
    const router = useRouter();
    router.replace('/sign-in');
  }

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
      location.pathname = `/query/${data.queryId}`;
    }

    setErrors(newErrors);
    setProcessing(false);
  };

  const pageTitle = queryId ? 'SPARQLクエリ編集' : 'SPARQLクエリ新規作成';

  return (
    <Layout>
      <Head subtitle={pageTitle} />

      <Segment clearing>
        <Header as="h2">{pageTitle}</Header>

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
      </Segment>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const queryId = context.query.edit;

  if (queryId) {
    const query = await fetchQuery(queryId);
    if (!query) {
      context.res.writeHead(307, { Location: '/404' }).end();
      return { props: {} };
    }
    return { props: query };
  }

  return {
    props: {
      queryId: null,
      authorUid: null,
      title: '',
      endpoint: '',
      query: '',
      tags: [],
      createdAt: null,
    },
  };
}
