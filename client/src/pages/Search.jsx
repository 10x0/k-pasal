import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import productApi from '../services/product';
import ProductCard from '../components/ProductCard';
import { Spin } from 'antd';

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState(null);
  const { key } = useParams();
  const emptyProdcuts = () => products.length < 1;

  const fetchProducts = async () => {
    setLoading(true);
    let res = await productApi.search(key);

    setProducts(res.allProducts);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
    return () => {
      setProducts(null);
    };
  }, [key]);

  return loading ? (
    <div className="w-full h-full grid place-items-center">
      <Spin />
    </div>
  ) : (
    <div className="w-full h-full p-10">
      <div className="text-2xl font-semibold">Search</div>
      {products?.length < 1 ? (
        <div>
          0 products found.
          <div>
            <Link to="/">Go back</Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-8 py-8">
          {products?.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
