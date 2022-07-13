import { Order } from '../../src/models/order';
import { User } from '../../src/models/user';
import { Product } from '../../src/models/product';
import app from '../../src/server';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';

const req = supertest(app);

describe('Test order endpoints', () => {
    let user: User;
    let token: string;
    let order: Order;

    beforeAll(async () => {
        const res = await req
            .post('/users')
            .send({
                user_name: 'momo',
                first_name: 'mohamed',
                last_name: 'tarek',
                password: '111'
            });

        token = res.body as string;
        user = jwt.decode(token) as User;
    });

    afterAll(async () => {
        await req.delete('/orders').set('Authorization', `Bearer ${token}`);
        await req.delete('/users').set('Authorization', `Bearer ${token}`);
    });


    it('create two new order', async () => {

        let res = await req.post('/orders').set('Authorization', `Bearer ${token}`).send({
            user_id: user.id,
            status: 'complete'
        });

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch('application/json');

        res = await req.post('/orders').set('Authorization', `Bearer ${token}`).send({
            user_id: user.id,
            status: 'active'
        });
        order = res.body as Order;

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch('application/json');

        expect(res.body.user_id).toEqual(`${user.id}`);
        expect(order.status).toEqual('active');
    });

    it('get current order of the user', async () => {
        const res = await req.get(`/orders/current/${user.id}`).set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch('application/json');

        expect(res.body.user_id).toEqual(`${user.id}`);
        expect(res.body.status).toEqual('active');
    });

    it('get complete order of the user', async () => {
        const res = await req.get(`/orders/complete/${user.id}`).set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch('application/json');

        expect(res.body.length).toEqual(1);
        expect(res.body[0].user_id).toEqual(`${user.id}`);
        expect(res.body[0].status).toEqual('complete');
    });

    it('get all orders', async () => {
        const res = await req.get('/orders');

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch('application/json');

        expect(res.body.length).toEqual(2);
        expect(res.body[0].user_id).toEqual(`${user.id}`);
        expect(res.body[0].status).toEqual('complete');
    });

    it('get order by id', async () => {
        const res = await req.get(`/orders/${order.id}`);


        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch('application/json');

        expect(res.body.user_id).toEqual(`${user.id}`);
        expect(res.body.status).toEqual('active');
    });

    it('delete order by id', async () => {
        const res = await req.delete(`/orders/${order.id}`).set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch('application/json');

        expect(res.body.user_id).toEqual(`${user.id}`);
        expect(res.body.status).toEqual('active');
    });
});


describe('Test Order_porduct Endpoint', () => {
    let user: User;
    let token: string;
    let AOrder: Order;
    let COrder: Order;
    let cheese: Product;
    let car: Product;
    let op_id: string;

    beforeAll(async () => {
        let res = await req
            .post('/users')
            .send({
                user_name: 'momo',
                first_name: 'mohamed',
                last_name: 'tarek',
                password: '111'
            });

        token = res.body;
        user = jwt.decode(token) as User;

        res = await req.post('/orders').set('Authorization', `Bearer ${token}`).send({
            user_id: user.id,
            status: 'complete'
        });
        COrder = res.body;
        res = await req.post('/orders').set('Authorization', `Bearer ${token}`).send({
            user_id: user.id,
            status: 'active'
        });
        AOrder = res.body;

        res = await req.post('/products').set('Authorization', `Bearer ${token}`).send({
            name: 'cheese',
            price: 5,
            category: 'food'
        });
        cheese = res.body;
        res = await req.post('/products').set('Authorization', `Bearer ${token}`).send({
            name: 'car',
            price: 1000,
            category: 'cars'
        });
        car = res.body;
    });

    afterAll(async () => {
        await req.delete(`/order_product`);
        await req.delete('/products').set('Authorization', `Bearer ${token}`);
        await req.delete('/orders').set('Authorization', `Bearer ${token}`);
        await req.delete('/users').set('Authorization', `Bearer ${token}`);
    });

    it('add product to order', async () => {

        await req.post(`/order_product/${COrder.id}/product`).set('Authorization', `Bearer ${token}`).send({
            product_id: cheese.id,
            quantity: 5
        });

        await req.post(`/order_product/${COrder.id}/product`).set('Authorization', `Bearer ${token}`).send({
            product_id: car.id,
            quantity: 2
        });

        await req.post(`/order_product/${AOrder.id}/product`).set('Authorization', `Bearer ${token}`).send({
            product_id: cheese.id,
            quantity: 50
        });

        const res = await req.post(`/order_product/${AOrder.id}/product`).set('Authorization', `Bearer ${token}`).send({
            product_id: car.id,
            quantity: 2
        });

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch('application/json');
        op_id = res.body.id;
        expect(res.body.order_id).toEqual(`${AOrder.id}`);
        expect(res.body.product_id).toEqual(`${car.id}`);
        expect(res.body.quantity).toEqual(2);
    });

    it('edit Product In Order', async () => {
        const res = await req.put(`/order_product/${AOrder.id}/product/${op_id}`).set('Authorization', `Bearer ${token}`).send({
            product_id: car.id,
            quantity: 20
        });

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch('application/json');

        expect(res.body.order_id).toEqual(`${AOrder.id}`);
        expect(res.body.product_id).toEqual(`${car.id}`);
        expect(res.body.quantity).toEqual(20);
    });

    it('remove Record From Order Product', async () => {
        const res = await req.delete(`/order_product/${op_id}`).set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch('application/json');

        expect(res.body.quantity).toEqual(20);
    });

    it('remove All Products In Order', async () => {
        const res = await req.delete(`/order_product/${AOrder.id}/product`).set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch('application/json');

        expect(res.body.length).toEqual(1);
    });

    it('get all order products', async () => {
        const res = await req.get(`/order_product`);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch('application/json');
    });

    it('clear order products', async () => {
        const res = await req.delete(`/order_product`).set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch('application/json');

        expect(res.body.length).toEqual(2);
    });
});