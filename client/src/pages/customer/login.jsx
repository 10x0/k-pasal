import { Form, Input, Button, Checkbox, message } from 'antd';
import { useState } from 'react';
import { useSession } from '../../components/Session/Provider';
import authApi from '../../services/auth';

const Login = () => {
  const { openModal, showSignUp, showSignIn, saveSession } = useSession();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      let res = await authApi.login(values);
      message.success(`Welcome back, ${res.user.name}. 🙏`);
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
      <h2 className="text-2xl font-bold">Log in</h2>
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
              message: 'Password is required.',
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

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            className="w-full"
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
      <div className="text-center mt-3 ">
        <a href="#forgot-password" className="text-decoration-none text-muted">
          Forgot Password ?
        </a>
      </div>
      <div className="text-center mt-3">
        Don't have an account ?{' '}
        <a
          type="button"
          onClick={() => {
            showSignIn(false);
            showSignUp(true);
          }}
          className="text-danger fw-bold"
        >
          Create New
        </a>
      </div>
    </section>
  );
};

export default Login;
