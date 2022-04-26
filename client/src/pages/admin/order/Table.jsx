import { Table, Space, Popconfirm, message, Tag } from 'antd';
import { useEffect, useState } from 'react';
import orderApi from '../../../services/order';

const { Column } = Table;

export default () => {
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      let res = await orderApi.getAll();
      setData(res.allOrders);
    };
    fetchOrders();
  }, [refresh]);

  const changeStatus = async (id, status) => {
    await orderApi.update(id, status);
    message.success('Updated successfully.');
    setRefresh(!refresh);
  };

  const setColor = (status) => {
    if (status === 'pending') {
      return 'blue';
    } else if (status === 'shipped') {
      return 'orange';
    } else {
      return 'green';
    }
  };

  return (
    <Table dataSource={data}>
      <Column title="User" dataIndex="name" key="name" />
      <Column title="Paid ($)" dataIndex="paid" key="paid" />
      <Column
        title="Status"
        dataIndex="status"
        key="status"
        render={(status, record) => (
          <>
            <Tag color={setColor(status)} key={record._id}>
              {status}
            </Tag>
          </>
        )}
      />
      <Column
        title="Action"
        key="action"
        render={(text, record) => (
          <Space size="middle">
            {record?.status === 'pending' && (
              <Popconfirm
                title="Sure to mark shipped?"
                onConfirm={() => changeStatus(record._id, 'shipped')}
              >
                <div className="rounded cursor-pointer text-white bg-orange-400 px-4 py-2 hover:bg-orange-500">
                  Mark Shipped
                </div>
              </Popconfirm>
            )}
            {record?.status === 'shipped' && (
              <Popconfirm
                title="Sure to mark delivered?"
                onConfirm={() => changeStatus(record._id, 'delivered')}
              >
                <div className="rounded cursor-pointer text-white bg-green-400 px-4 py-2 hover:bg-green-500">
                  Mark Delivered
                </div>
              </Popconfirm>
            )}
            {record?.status === 'delivered' && (
              <div className="text-lg cursor-pointer text-green-400 hover:text-green-500">
                <i class="fa-solid fa-check"></i>
                Delivered
              </div>
            )}
          </Space>
        )}
      />
    </Table>
  );
};
