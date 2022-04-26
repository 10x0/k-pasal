const checkItemInCart = (data) => {
  let cart = JSON.parse(localStorage.getItem('__cart__'));
  return cart ? cart.every((item) => item._id !== data._id) : true;
};

const getCartItems = () => JSON.parse(localStorage.getItem('__cart__'));

const addToCart = (data) => {
  let cart = JSON.parse(localStorage.getItem('__cart__'));
  if (cart === null || cart.length === 0) {
    localStorage.setItem('__cart__', JSON.stringify([data]));
  } else {
    let not = checkItemInCart(data);
    not && localStorage.setItem('__cart__', JSON.stringify([...cart, data]));
  }
};

const removeItem = (data) => {
  let cart = JSON.parse(localStorage.getItem('__cart__'));
  if (cart !== null || cart.length > 0) {
    let filtered = cart.filter((item) => item._id !== data._id);
    localStorage.setItem('__cart__', JSON.stringify(filtered));
  }
};

const removeAll = () => {
  localStorage.setItem('__cart__', JSON.stringify([]));
};

export default {
  checkItemInCart,
  getCartItems,
  addToCart,
  removeItem,
  removeAll,
};
