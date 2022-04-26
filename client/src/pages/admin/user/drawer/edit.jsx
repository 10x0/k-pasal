import React, { useEffect, useState } from 'react';
import { Drawer, Button, Form, Input, Select, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import userApi from '../../../../services/user';
import { mapObjectToFormData } from '../../../../utils';
import { useForm } from 'antd/lib/form/Form';

const App = ({ edit, showEdit, user, setRefresh }) => {
  const [loading, setLoading] = useState(false);
  const [form] = useForm();

  const hide = () => {
    showEdit(false);
  };

  const onFinish = async (values) => {
    setLoading(true);
    let data = mapObjectToFormData(values);
    await userApi.update(user._id, data).then((res) => {
      message.success('User updated successfully.');
      hide();
      setRefresh();
    });
    setLoading(false);
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue({
      name: user?.name,
      email: user?.email,
      role: user?.role,
    });

    return () => form.resetFields();
  }, [user]);

  return (
    <>
      <Drawer
        title="Edit user"
        placement="right"
        size="large"
        onClose={hide}
        visible={edit}
      >
        <Form
          form={form}
          className="w-full"
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: 'Name is required.' }]}
          >
            <Input placeholder="Enter name of the user" />
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
            label="New Password"
            name="password"
            rules={[
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
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Role is required' }]}
          >
            <Select placeholder="Select role">
              <Option value="admin">Admin</Option>
              <Option value="customer">Customer</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              className="w-full"
              type="primary"
              size="large"
              htmlType="submit"
              loading={loading}
            >
              Update now
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default App;
