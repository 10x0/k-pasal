import { Select, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import productApi from '../../services/product';

const Explore = () => {
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let res = await productApi.getCategory(keyword);
      setProducts(res.allProducts);
      console.log(products);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const handleChange = (value) => {
    setKeyword(value);
  };

  useEffect(() => {
    fetchProducts();
    return () => {
      setProducts([]);
    };
  }, [keyword]);

  return loading ? (
    <div className="w-full h-full grid place-items-center">
      <Spin />
    </div>
  ) : (
    <div className="w-full h-full p-10">
      <div className="m-4 flex justify-center">
        <Select
          //   defaultValue="Choose category"
          style={{ width: 400 }}
          value={keyword}
          onChange={handleChange}
        >
          <Option value="">All</Option>
          <Option value="tshirts">T-Shirt</Option>
          <Option value="jackets">Jackets</Option>
          <Option value="pants">Pants</Option>
          <Option value="caps">Caps</Option>
          <Option value="shoes">Shoes</Option>
        </Select>
      </div>
      {products.length < 1 ? (
        <div className="w-full h-full grid place-items-center">
          No items found
        </div>
      ) : (
        <section className="flex flex-wrap gap-8">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </section>
      )}
    </div>
  );
};

export default Explore;
