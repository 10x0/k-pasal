import { Rate } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <section
      className="cursor-pointer"
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <div className="md:w-72 h-96 p-2 bg-white rounded-xl shadow-lg flex flex-col">
        <div className="h-72 rounded-lg bg-gray-200">
          <img
            className="h-full object-cover object-position-cover rounded-lg"
            src={product.image.url}
            alt={`product-${product.id}`}
          />
        </div>
        <div className="py-4 px-2 flex justify-between grow">
          <aside className="flex flex-col justify-between">
            <div>
              <div className="text-xl font-medium">{product.name}</div>
              <div className="text-sm text-gray-400">{product.category}</div>
            </div>
            <Rate value={product.rating} allowHalf={true} />
          </aside>
          <div className="text-lg font-semibold">${product.price}</div>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
