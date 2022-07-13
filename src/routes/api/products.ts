import express from 'express';
import authenticate from '../../middlewares/authenticate';
import { ProductHandler } from '../../handlers/product';

const products = express.Router();
const prodHan = new ProductHandler();

products.get('/', (req, res) => {
   prodHan.index(req, res);
});

products.get('/top5', (req, res) => {
   prodHan.mostPopularproducts(req, res);
});

products.get('/:id', (req, res) => {
   prodHan.show(req, res);
});

products.get('/category/:category', (req, res) => {
   prodHan.productsByCategory(req, res);
});

products.post('/', authenticate, (req, res) => {
   prodHan.create(req, res);
});

products.put('/:id', authenticate, (req, res) => {
   prodHan.edit(req, res);
});

products.delete('/:id', authenticate, (req, res) => {
   prodHan.delete(req, res);
});

products.delete('/', authenticate, (req, res) => {
   prodHan.deleteAll(req, res);
});

products.all('/', (_req, res) => {
   res.statusCode = 403;
   res.send('Method not implemented');
});

export default products;
