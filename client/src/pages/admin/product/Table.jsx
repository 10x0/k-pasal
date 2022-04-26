import { Table, Space, Popconfirm, message } from 'antd';
import { useEffect, useState } from 'react';
import productApi from '../../../services/product';

const { Column } = Table;

export default ({ refresh, setRefresh, showEdit, editItem }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      let res = await productApi.getAll();
      setData(res.allProducts);
    };
    fetchProducts();
  }, [refresh]);

  const onRemove = async (product) => {
    try {
      await productApi.remove(product._id);
      message.success('Deleted successfully.');
      setRefresh();
    } catch (err) {}
  };

  return (
    <Table dataSource={data}>
      <Column title="Full Name" dataIndex="name" key="name" />
      <Column title="Stocks" dataIndex="stock" key="stock" />
      <Column title="Price" dataIndex="price" key="price" />
      <Column title="Description" dataIndex="description" key="description" />
      <Column
        title="Action"
        key="action"
        render={(text, record) => (
          <Space size="middle">
            <div
              className="text-lg cursor-pointer text-blue-400 hover:text-blue-700"
              onClick={() => {
                editItem(record);
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
