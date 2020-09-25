import React from 'react';
import { Form, Message, Button, Divider, Icon } from 'semantic-ui-react';
import { useSettingsForm } from '@/hooks/use-settings-form';

const SettingsForm: React.FC = () => {
  const {
    form,
    loading,
    errors,
    processing,
    done,
    handleChange,
    handleSubmit,
  } = useSettingsForm();

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
            name="userId"
            value={form.userId}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            type="text"
            label="User Name"
            placeholder="User Name"
            required
            name="userName"
            value={form.userName}
            onChange={handleChange}
          />
        </Form.Field>

        <Divider hidden />

        <Form.Field>
          <Form.Input
            type="text"
            label="Website"
            placeholder="Website"
            name="website"
            value={form.website}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            type="text"
            label="Facebook ID"
            placeholder="Facebook ID"
            name="facebookId"
            value={form.facebookId}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            type="text"
            label="Twitter ID"
            placeholder="Twitter ID"
            name="twitterId"
            value={form.twitterId}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            type="text"
            label="GitHub ID"
            placeholder="GitHub ID"
            name="gitHubId"
            value={form.gitHubId}
            onChange={handleChange}
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
};

export default SettingsForm;
