import { Popconfirm } from 'antd';

export default ({ confirm }) => (
  <Popconfirm
    title="Are you sure to delete?"
    onConfirm={confirm}
    okText="Yes"
    cancelText="No"
  >
    <a href="#" className="text-red-500 hover:text-red-600">
      Delete
    </a>
  </Popconfirm>
);
