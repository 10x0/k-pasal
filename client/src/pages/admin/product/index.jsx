import { Button } from 'antd';
import React, { useState } from 'react';
import ProductTable from './Table';
import AddDrawer from './drawer/add';
import EditDrawer from './drawer/edit';
import { useNavigate } from 'react-router-dom';

const AdminProductsPage = () => {
  const [add, showAdd] = useState(false);
  const [edit, showEdit] = useState(false);
  const [editItem, setEditItem] = useState();
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="w-full h-full p-10">
      <div className="flex justify-between mb-8">
        <Button
          onClick={() => navigate(-1)}
          type="link"
          className="justify-self-end"
        >
          Back
        </Button>
        <h2 className="text-4xl font-semibold text-blue-500">Products</h2>
        <Button
          onClick={() => showAdd(true)}
          type="primary"
          className="justify-self-end"
        >
          Add product
        </Button>
      </div>
      <AddDrawer
        add={add}
        showAdd={(value) => showAdd(value)}
        setRefresh={setRefresh}
      />
      <EditDrawer
        product={editItem}
        edit={edit}
        showEdit={(value) => showEdit(value)}
        setRefresh={setRefresh}
      />
      <ProductTable
        editItem={(value) => setEditItem(value)}
        showEdit={() => showEdit(true)}
        refresh={refresh}
        setRefresh={() => setRefresh(!refresh)}
      />
    </div>
  );
};

export default AdminProductsPage;
