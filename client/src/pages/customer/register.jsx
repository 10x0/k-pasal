import { Form, Input, Button, Checkbox, message } from 'antd';
import { useState } from 'react';
import { useSession } from '../../components/Session/Provider';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { openModal, showSignUp, showSignIn, saveSession } = useSession();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      let res = await authApi.register(values);
      message.success(`Welcome, ${res.user.name}. 🙏`);
      showSignUp(false);
      showSignIn(true);
      openModal(false);
      saveSession(res);
    } catch (err) {
      setLoading(false);
    }
    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <section className="bg-white">
      <h2 className="text-2xl font-bold">Register</h2>
      <Form
        className="w-full"
        name="basic"
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true, message: 'Name is required.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Email is required.' },
            {
              type: 'email',
              message: 'Enter a valid email!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter password.',
            },
            {
              pattern:
                '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
              message:
                '${label} must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Re-enter Password"
          name="confirmPassword"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please re-enter password.',
            },
            {
              pattern:
                '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$',
              message:
                '${label} must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name="agreeed" valuePropName="checked">
          <Checkbox>I agree to all the Terms and Conditions</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            className="w-full"
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
      <div className="text-center mt-3">
        Already have an account ?{' '}
        <a
          type="button"
          onClick={() => {
            showSignUp(false);
            showSignIn(true);
          }}
          className="text-danger fw-bold"
        >
          Log in
        </a>
      </div>
    </section>
  );
};

export default Register;
