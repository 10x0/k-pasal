import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';
import shop from '../../images/shop.png';
import khalti from '../../images/khalti.png';
import productApi from '../../services/product';
import ProductCard from '../../components/ProductCard';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let res = await productApi.getAll();
      setProducts(res.allProducts);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    return () => {
      setProducts([]);
    };
  }, []);

  return loading ? (
    <div className="w-full h-full grid place-items-center">
      <Spin />
    </div>
  ) : (
    <div className="w-full h-full md:flex">
      <aside className="w-full p-10 flex flex-col">
        <div className="bg-blue-600 h-3/5 rounded-lg shadow-lg shadow-blue-300 flex">
          <div className="p-4 md:p-8 flex flex-col h-full">
            <h4 className="text-2xl md:text-5xl text-white font-medium">
              Grab the best deal
            </h4>
            <div className="mt-4">
              <Link
                to="/explore"
                className="bg-white text-black rounded py-2 px-4"
              >
                Explore now
              </Link>
            </div>
          </div>
          <div className="md:grow w-1/2 h-full md:w-full py-8">
            <img src={shop} alt="shop" />
          </div>
        </div>
        <div className="w-full mt-4 p-4 rounded-lg bg-[#5B2C92] flex shadow-lg shadow-[#5B2C9266]">
          <div className="p-4 md:p-8">
            <h4 className="text-2xl md:text-5xl text-white font-medium">
              Now, Pay with Khalti
            </h4>
            <span className="text-white text-lg">Get 20% off</span>
          </div>
          <div className="md:grow w-1/2 h-full md:w-full py-8">
            <img src={khalti} alt="khalti" />
          </div>
        </div>
      </aside>
      <aside className="w-full md:w-1/2 p-10 flex flex-col">
        <h2 className="text-4xl font-semibold">Latest products</h2>
        <section className="w-full overflow-x-auto no-scrollbar snap flex flex-col md:flex-row gap-8 py-4">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </section>

        <div className="grow my-4 rounded flex">
          <aside className="flex flex-col items-start justify-end">
            <div className="text-2xl font-semibold">Connect with us</div>
            <section className="mt-4 w-full flex justify-between items-end">
              <section>
                <Link
                  to="/"
                  className="select-none text-5xl font-semibold flex-grow md:flex-grow-0"
                >
                  <span className="text-blue-600 devnagari">कपडा</span>
                  <span className="text-black orbitron">Pasal</span>
                </Link>

                <aside className="flex gap-2">
                  <div>
                    <i className="fa-brands fa-facebook-f text-xl p-2 hover:text-blue-600 cursor-pointer"></i>
                  </div>
                  <div>
                    <i className="fa-brands fa-instagram text-xl p-2 hover:text-blue-600 cursor-pointer"></i>
                  </div>
                  <div>
                    <i className="fa-brands fa-twitter text-xl p-2 hover:text-blue-600 cursor-pointer"></i>
                  </div>
                  <div>
                    <i className="fa-brands fa-medium text-xl p-2 hover:text-blue-600 cursor-pointer"></i>
                  </div>
                  <div>
                    <i className="fa-brands fa-youtube text-xl p-2 hover:text-blue-600 cursor-pointer"></i>
                  </div>
                </aside>

                <div className="text-lg font-semibold">
                  Jagdol, Gokarneshwor-02
                </div>
                <div className="text-lg font-semibold">
                  contact@kpasal.com.np
                </div>
                <div className="text-lg font-semibold">
                  +01-4916600, +977-9849890000
                </div>
              </section>
            </section>
          </aside>
        </div>
      </aside>
    </div>
  );
};

export default Home;
