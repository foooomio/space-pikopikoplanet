import { useState, useEffect } from 'react';
import { Form, Message, Button, Divider, Icon } from 'semantic-ui-react';
import { useUser } from '@/lib/user-context';
import { fetchUser, fetchUserByUserId, saveUser } from '@/lib/database';

const validateUserId = async (userId, uid) => {
  if (userId.length === 0) {
    return 'IDが入力されていません。';
  }
  if (/[^0-9A-Za-z-_]/.test(userId)) {
    return 'IDに使用できない文字が含まれています。';
  }
  const user = await fetchUserByUserId(userId);
  if (user.userId === userId && user.uid !== uid) {
    return 'IDが他の人に使用されています。';
  }
  return null;
};

const validateUserName = (userName) => {
  if (userName.length === 0) {
    return '名前が入力されていません。';
  }
  return null;
};

export default function SettingsForm() {
  const [user] = useUser();

  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [website, setWebsite] = useState('');
  const [facebookId, setFacebookId] = useState('');
  const [twitterId, setTwitterId] = useState('');
  const [gitHubId, setGitHubId] = useState('');

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async () => {
    setProcessing(true);
    setDone(false);

    const newErrors = [
      await validateUserId(userId, user.uid),
      validateUserName(userName),
    ].filter((e) => e !== null);

    if (newErrors.length === 0) {
      await saveUser({
        uid: user.uid,
        userId,
        userName,
        website,
        facebookId,
        twitterId,
        gitHubId,
      });
      setDone(true);
    }

    setProcessing(false);
    setErrors(newErrors);
  };

  useEffect(() => {
    if (!user) return;

    fetchUser(user.uid).then((data) => {
      setUserId(data.userId ?? '');
      setUserName(data.userName ?? '');
      setWebsite(data.website ?? '');
      setFacebookId(data.facebookId ?? '');
      setTwitterId(data.twitterId ?? '');
      setGitHubId(data.gitHubId ?? '');
      setLoading(false);
    });
  }, [user]);

  return (
    <>
      {errors.length !== 0 && <Message error header="エラー" list={errors} />}
      <Form loading={loading}>
        <Form.Field>
          <Form.Input
            type="text"
            label="User ID"
            placeholder="User ID /[0-9A-Za-z-_]+/"
            required
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            type="text"
            label="User Name"
            placeholder="User Name"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Field>

        <Divider hidden />

        <Form.Field>
          <Form.Input
            type="text"
            label="Website"
            placeholder="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            type="text"
            label="Facebook ID"
            placeholder="Facebook ID"
            value={facebookId}
            onChange={(e) => setFacebookId(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            type="text"
            label="Twitter ID"
            placeholder="Twitter ID"
            value={twitterId}
            onChange={(e) => setTwitterId(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            type="text"
            label="GitHub ID"
            placeholder="GitHub ID"
            value={gitHubId}
            onChange={(e) => setGitHubId(e.target.value)}
          />
        </Form.Field>

        <Divider hidden />

        <Button
          type="submit"
          primary
          content="Submit"
          onClick={handleSubmit}
          loading={processing}
        />
        {done && <Icon name="check" color="green" size="large" />}
      </Form>
    </>
  );
}
