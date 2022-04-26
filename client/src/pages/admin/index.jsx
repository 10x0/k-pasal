import React from 'react';
import clothes from '../../images/clothes.png';
import users from '../../images/users.png';
import delivery from '../../images/delivery.png';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full h-full grid grid-cols-1 md:grid-cols-2 grid-flow-rows p-10 gap-8">
      <aside
        className="p-4 md:p-8 text-gray-100 cursor-pointer rounded-lg shadow-lg shadow-blue-200 bg-blue-400 hover:bg-blue-500 flex justify-between"
        onClick={() => navigate('/products')}
      >
        <div className="text-4xl md:text-6xl font-bold">Products</div>
        <img className="w-1/2 h-full self-end" src={clothes} />
      </aside>
      <aside
        className="p-4 md:p-8 text-gray-100 cursor-pointer rounded-lg shadow-lg shadow-green-200 bg-green-400 hover:bg-green-500 flex justify-between"
        onClick={() => navigate('/users')}
      >
        <div className="text-4xl md:text-6xl font-bold">Users</div>
        <img className="w-1/2 h-full self-end" src={users} />
      </aside>
      <aside
        className="p-4 md:p-8 text-gray-100 cursor-pointer rounded-lg shadow-lg shadow-red-100 bg-red-400 hover:bg-red-500 flex justify-between"
        onClick={() => navigate('/orders')}
      >
        <div className="text-4xl md:text-6xl font-bold">Orders</div>
        <img className="w-1/2 h self-end-full" src={delivery} />
      </aside>
    </section>
  );
};

export default AdminHome;
