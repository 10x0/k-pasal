import AdminHome from '../pages/admin';
import AdminOrdersPage from '../pages/admin/order';
import AdminProductsPage from '../pages/admin/product';
import AdminUsersPage from '../pages/admin/user';
import Cart from '../pages/customer/Cart';
import Explore from '../pages/customer/Explore';
import Home from '../pages/customer/home';
import ProductDetail from '../pages/customer/ProductDetail';
import Search from '../pages/Search';

const routeConfig = [
  {
    path: '/',
    title: 'Home',
    component: Home,
    roles: [],
  },
  {
    path: '/explore',
    title: 'Explore',
    component: Explore,
    roles: [],
  },
  {
    path: '/product/:id',
    title: 'Product Detail',
    component: ProductDetail,
    roles: [],
  },
  {
    path: '/cart',
    title: 'Cart',
    component: Cart,
    roles: [],
  },
  {
    path: '/search/:key',
    title: 'Search',
    component: Search,
    roles: [],
  },
  {
    path: '/',
    title: 'Admin Home',
    component: AdminHome,
    roles: ['admin'],
  },

  {
    path: '/products',
    title: 'Admin Products Page',
    component: AdminProductsPage,
    roles: ['admin'],
  },
  {
    path: '/users',
    title: 'Admin Users Page',
    component: AdminUsersPage,
    roles: ['admin'],
  },
  {
    path: '/orders',
    title: 'Admin Orders Home',
    component: AdminOrdersPage,
    roles: ['admin'],
  },
];

export default routeConfig;
