import {
  Table,
  Tag,
  Space,
  message,
  Button,
  Modal,
  Form,
  Input,
  Select,
} from 'antd';
import Delete from '../Delete';
import userApi from '../../services/user';
import { useState } from 'react';

export default function UsersTable({ users, refresh }) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('');
  const [edit, setEdit] = useState(false);
  const [item, setItem] = useState({});

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'admin') {
              color = 'green';
            }
            if (tag === 'moderator') {
              color = 'volcano';
            }
            if (tag === 'customer') {
              color = 'geekblue';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <div
            className="text-blue-500 hover:text-blue-600 cursor-pointer"
            onClick={() => {
              setItem(record.item);
              setEdit(true);
              setVisible(true);
            }}
          >
            Edit
          </div>
          <Delete confirm={record.remove} />
        </Space>
      ),
    },
  ];

  const deleteUser = async (id, refresh) => {
    try {
      await userApi.remove(id);
      message.success('Deleted successfully.');
      refresh(true);
    } catch (error) {
      message.error(error);
    }
  };

  const createData = (users, refresh) => {
    let data = [];
    users.map((user) => {
      let u = {
        key: user._id,
        name: user.name,
        email: user.email,
        tags: [user.role],
        item: user,
        remove: () => deleteUser(user._id, refresh),
      };
      data.push(u);
    });
    return data;
  };
  const showModal = () => {
    setVisible(true);
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      let res = await userApi.create({ ...values, role });
      refresh(true);
      setVisible(false);
    } catch (err) {
      setLoading(false);
    }
    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="flex flex-col">
      <div style={{ marginBottom: 16, alignSelf: 'end' }}>
        <Button type="primary" onClick={showModal}>
          Add
        </Button>
      </div>
      <Table columns={columns} dataSource={createData(users, refresh)} />

      {edit ? (
        <Modal
          title="Edit"
          visible={edit}
          okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: true }}
          onCancel={() => {
            setItem({});
            setRole('');
            setEdit(false);
            setVisible(false);
          }}
        >
          <Form
            className="w-full"
            name="basic"
            initialValues={{
              name: item.name,
              email: item.email,
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
            Role:
            <Select
              defaultValue={item.role}
              style={{ width: '100%', margin: '12px' }}
              onChange={(value) => setRole(value)}
            >
              <Option value="admin">Admin</Option>
              <Option value="customer">Customer</Option>
            </Select>
            <Form.Item>
              <Button
                className="w-full"
                type="primary"
                size="large"
                htmlType="submit"
                loading={loading}
              >
                Add new
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      ) : (
        <Modal
          title="Add"
          visible={visible}
          okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: true }}
          onCancel={() => setVisible(false)}
        >
          <Form
            className="w-full"
            name="basic"
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
            Role:
            <Select
              defaultValue="customer"
              style={{ width: '100%', margin: '12px' }}
              onChange={(value) => setRole(value)}
            >
              <Option value="admin">Admin</Option>
              <Option value="customer">Customer</Option>
            </Select>
            <Form.Item>
              <Button
                className="w-full"
                type="primary"
                size="large"
                htmlType="submit"
                loading={loading}
              >
                Add new
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
}
