import express from 'express';
import authenticate from '../../middlewares/authenticate';
import { UserHandler } from '../../handlers/user';

const users = express.Router();
const userHan = new UserHandler();

users.get('/', authenticate, (req, res) => {
   userHan.index(req, res);
});

users.get('/:id', authenticate, (req, res) => {
   userHan.show(req, res);
});

users.post('/', (req, res) => {
   userHan.create(req, res);
});

users.post('/login', (req, res) => {
   userHan.authenticate(req, res);
});

users.delete('/', authenticate, (req, res) => {
   userHan.deleteAll(req, res);
});

users.all('/', (_req, res) => {
   res.statusCode = 404;
   res.send('Method not implemented');
});

export default users;
