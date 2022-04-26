import { Rate, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cartApi from '../../services/cart';
import productApi from '../../services/product';

const ProductDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [refresh, setRefresh] = useState(false);

  const fetchProduct = async () => {
    let res = await productApi.getSingle(id);
    setProduct(res.singleProduct);
  };

  useEffect(() => {
    setLoading(true);
    fetchProduct();
    setLoading(false);
    return () => {
      setProduct({});
    };
  }, [refresh]);

  return loading ? (
    <div className="w-full h-full grid place-items-center">
      <Spin />
    </div>
  ) : (
    <section className="w-full h-full flex items-center justify-center">
      <div className="m-4 w-full md:w-3/4 h-auto md:h-3/4 bg-white shadow-xl rounded-lg p-8 flex flex-col md:flex-row">
        <aside className="w-full md:w-2/5 h-full bg-gray-200 rounded-lg">
          <img
            className="w-full h-full object-cover bject-position-center rounded-lg"
            src={product.image?.url}
          />
        </aside>
        <aside className="p-8">
          <div className="text-2xl md:text-4xl font-semibold">
            {product.name}
          </div>
          <div className="text-2xl md:text-4xl">
            <Rate value={product.rating} />
          </div>
          <div className="text-2xl md:text-4xl my-4">$ {product.price}</div>
          <div className="my-10 text-lg text-gray-500">
            {product.description}
          </div>
          {cartApi.checkItemInCart(product) ? (
            <div
              className="text-2xl text-white cursor-pointer bg-blue-700 px-4 py-2 rounded-lg shadow-lg shadow-blue-200"
              onClick={() => {
                cartApi.addToCart(product);
                setRefresh(!refresh);
              }}
            >
              Add to cart
            </div>
          ) : (
            <div className="text-2xl text-white cursor-pointer bg-blue-400 px-4 py-2 rounded-lg">
              Added to cart
            </div>
          )}
        </aside>
      </div>
    </section>
  );
};

export default ProductDetail;
