import React, { useState } from 'react';
import { Drawer, Button, Form, Input, Select, message } from 'antd';
import userApi from '../../../../services/user';
import { mapObjectToFormData } from '../../../../utils';

const App = ({ add, showAdd, setRefresh }) => {
  const [loading, setLoading] = useState(false);

  const hide = () => {
    showAdd(false);
  };

  const onFinish = async (values) => {
    setLoading(true);
    let data = mapObjectToFormData(values);
    await userApi.create(data).then((res) => {
      message.success('User created successfully.');
      hide();
      setRefresh();
    });
    setLoading(false);
  };

  return (
    <>
      <Drawer
        title={`Add new user`}
        placement="right"
        size="large"
        onClose={hide}
        visible={add}
      >
        <Form
          className="w-full"
          name="basic"
          initialValues={{
            remember: false,
          }}
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
            label="Set password"
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
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default App;
