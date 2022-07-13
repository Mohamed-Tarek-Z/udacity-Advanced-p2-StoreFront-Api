import express from 'express';
import authenticate from '../../middlewares/authenticate';
import { OrderHandler } from '../../handlers/order';

const orders = express.Router();
const order_product = express.Router();
const ordHan = new OrderHandler();

orders.get('/', (req, res) => {
   ordHan.index(req, res);
});

orders.get('/:id', (req, res) => {
   ordHan.show(req, res);
});

orders.delete('/:id', authenticate, (req, res) => {
   ordHan.delete(req, res);
});

orders.delete('/', authenticate, (req, res) => {
   ordHan.deleteAll(req, res);
});

orders.post('/', authenticate, (req, res) => {
   ordHan.create(req, res);
});

orders.get('/current/:user_id', authenticate, (req, res) => {
   ordHan.currentOrderByUser(req, res);
});

orders.get('/complete/:user_id', authenticate, (req, res) => {
   ordHan.completedOrdersByUser(req, res);
});

//op
order_product.get('/', (req, res) => {
   ordHan.GetAllOfOrder_Prod(req, res);
});

order_product.post('/:order_id/product', authenticate, (req, res) => {
   ordHan.addProduct(req, res);
});

order_product.put('/:order_id/product/:op_id', authenticate, (req, res) => {
   ordHan.editProductInOrder(req, res);
});

order_product.delete('/:op_id', authenticate, (req, res) => {
   ordHan.removeRecordFromOrderProduct(req, res);
});

order_product.delete('/:order_id/product', authenticate, (req, res) => {
   ordHan.removeAllProductsInOrder(req, res);
});

order_product.delete('/', authenticate, (req, res) => {
   ordHan.clear_orderproducts(req, res);
});

orders.all('/', (_req, res) => {
   res.statusCode = 403;
   res.send('Method not implemented');
});
order_product.all('/', (_req, res) => {
   res.statusCode = 403;
   res.send('Method not implemented');
});

export { orders, order_product };
