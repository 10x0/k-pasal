import { Button } from 'antd';
import React, { useState } from 'react';
import UserTable from './Table';
import AddDrawer from './drawer/add';
import EditDrawer from './drawer/edit';
import { useNavigate } from 'react-router-dom';

const AdminUsersPage = () => {
  const [add, showAdd] = useState(false);
  const [edit, showEdit] = useState(false);
  const [editUser, setEditUser] = useState();
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
        <h2 className="text-4xl font-semibold text-green-500">Users</h2>
        <Button
          onClick={() => showAdd(true)}
          type="primary"
          className="justify-self-end"
        >
          Add new user
        </Button>
      </div>
      <AddDrawer
        add={add}
        showAdd={(value) => showAdd(value)}
        setRefresh={setRefresh}
      />
      <EditDrawer
        user={editUser}
        edit={edit}
        showEdit={(value) => showEdit(value)}
        setRefresh={setRefresh}
      />
      <UserTable
        editUser={(value) => setEditUser(value)}
        showEdit={() => showEdit(true)}
        refresh={refresh}
        setRefresh={() => setRefresh(!refresh)}
      />
    </div>
  );
};

export default AdminUsersPage;
