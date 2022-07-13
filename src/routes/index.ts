import express from 'express';
import products from './api/products';
import { orders, order_product } from './api/orders';
import users from './api/users';

const routes = express.Router();

routes.use('/products', products);
routes.use('/orders', orders);
routes.use('/order_product', order_product);
routes.use('/users', users);

routes.get('/', (_req, res) => {
   res.send('this is the index route');
});

routes.all('/', (_req, res) => {
   res.statusCode = 403;
   res.send('Method not implemented');
});

export default routes;
