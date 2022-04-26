import { message, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import KhaltiCheckout from 'khalti-checkout-web';
import { useNavigate } from 'react-router-dom';
import cartApi from '../../services/cart';
import { useSession } from '../../components/Session/Provider';
import orderApi from '../../services/order';
import cart from '../../services/cart';

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [items, setItems] = useState([]);
  const { verifySession, openModal } = useSession();
  const navigate = useNavigate();

  let config = {
    publicKey: import.meta.env.VITE_KHALTI_API_KEY,
    productIdentity: '1234567890',
    productName: 'Drogon',
    productUrl: 'http://gameofthrones.com/buy/Dragons',
    eventHandler: {
      onSuccess(payload) {
        let body = {
          token: payload?.token,
          products: items,
          paid: items.reduce((initial, item) => item.price + initial, 0),
        };
        return orderApi.create(body).then(async (res) => {
          await cart.removeAll();
          message.success('Order placed successfully.');
          navigate('/');
        });
      },
      // onError handler is optional
      onError(error) {
        // handle errors
        console.log(error);
      },
      onClose() {
        console.log('Widget is closing');
      },
    },
    paymentPreference: [
      'KHALTI',
      'EBANKING',
      'MOBILE_BANKING',
      'CONNECT_IPS',
      'SCT',
    ],
  };

  let checkout = new KhaltiCheckout(config);

  useEffect(() => {
    setLoading(true);
    let data = cartApi.getCartItems();
    setItems(data);
    setLoading(false);
  }, [refresh]);
  return loading ? (
    <div className="w-full h-full grid place-items-center">
      <Spin />
    </div>
  ) : (
    <section className="w-full h-full flex items-center justify-center">
      <div className="m-4 w-full md:w-3/4 h-3/5 md:h-3/4 bg-white shadow-xl rounded-lg p-8 flex flex-col">
        <div className="text-2xl font-bold">Bag items</div>
        <section className="my-4 flex flex-col gap-4">
          {items?.map((item) => (
            <section
              key={item._id}
              className="w-full bg-gray-200 p-4 flex justify-between rounded-xl"
            >
              <aside className="flex gap-4">
                <img className="w-1/6 rounded-lg" src={item.image.url} />
                <div>
                  <div className="text-xl font-medium">{item.name}</div>
                  <div className="text-xl font-medium">{item.price}</div>
                </div>
              </aside>
              <aside>
                <i
                  className="fa-solid fa-x text-red-400 cursor-pointer"
                  onClick={() => {
                    cartApi.removeItem(item);
                    setRefresh(!refresh);
                  }}
                ></i>
              </aside>
            </section>
          ))}
        </section>
        {items.length > 0 && (
          <div className="self-end">
            <div
              className="inline text-2xl text-white cursor-pointer bg-purple-700 px-4 py-2 rounded-lg"
              onClick={() => {
                verifySession()
                  ? checkout.show({ amount: 1000 })
                  : openModal(true);
              }}
            >
              Pay with Khalti
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
