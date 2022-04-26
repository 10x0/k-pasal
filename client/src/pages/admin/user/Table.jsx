import { Table, Space, Popconfirm, message, Tag } from 'antd';
import { useEffect, useState } from 'react';
import userApi from '../../../services/user';

const { Column } = Table;

export default ({ refresh, setRefresh, showEdit, editUser }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      let res = await userApi.getAll();
      setData(res.users);
    };
    fetchProducts();
  }, [refresh]);

  const onRemove = async (user) => {
    try {
      await userApi.remove(user._id);
      message.success('Deleted successfully.');
      setRefresh();
    } catch (err) {}
  };

  return (
    <Table dataSource={data}>
      <Column title="Full Name" dataIndex="name" key="name" />
      <Column title="Email" dataIndex="email" key="email" />
      <Column
        title="Roles"
        dataIndex="role"
        key="role"
        render={(role, record) => (
          <>
            {
              <Tag color={role === 'admin' ? 'blue' : 'green'} key={record._id}>
                {role}
              </Tag>
            }
          </>
        )}
      />
      <Column
        title="Action"
        key="action"
        render={(text, record) => (
          <Space size="middle">
            <div
              className="text-lg cursor-pointer text-blue-400 hover:text-blue-700"
              onClick={() => {
                editUser(record);
                showEdit();
              }}
            >
              <i className="fa-solid fa-pen-to-square mx-1"></i>
              Edit
            </div>
            <Popconfirm
              title="Sure to remove?"
              onConfirm={() => onRemove(record)}
            >
              <div className="text-lg cursor-pointer text-red-400 hover:text-red-500">
                <i className="fa-solid fa-trash-can mx-1"></i>
                Delete
              </div>
            </Popconfirm>
          </Space>
        )}
      />
    </Table>
  );
};
