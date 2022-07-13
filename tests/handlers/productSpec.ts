import app from '../../src/server';
import { Product } from '../../src/models/product';
import supertest from 'supertest';


const req = supertest(app);

describe('Test product endpoints', () => {
    let token: string;
    let cheese: Product;
    let car: Product;

    beforeAll(async () => {
        const res = await req
            .post('/users')
            .send({
                user_name: 'momo',
                first_name: 'mohamed',
                last_name: 'tarek',
                password: '111'
            });

        token = res.body;
    });

    afterAll(async () => {
        await req.delete('/products').set('Authorization', `Bearer ${token}`);
        await req.delete('/users').set('Authorization', `Bearer ${token}`);
    });

    it('creates two new products', async () => {
        let res = await req.post('/products').set('Authorization', `Bearer ${token}`).send({
            name: 'cheese',
            price: 5,
            category: 'food'
        });
        cheese = res.body;
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch('application/json');

        res = await req.post('/products').set('Authorization', `Bearer ${token}`).send({
            name: 'car',
            price: 1000,
            category: 'cars'
        });
        car = res.body;

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch('application/json');

        expect(cheese.name).toEqual('cheese');
        expect(cheese.price).toEqual(5);
        expect(cheese.category).toEqual('food');

        expect(car.name).toEqual('car');
        expect(car.price).toEqual(1000);
        expect(car.category).toEqual('cars');
    });

    it('get product by id', async () => {
        const res = await req.get(`/products/${cheese.id}`);


        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch('application/json');

        expect(res.body.name).toEqual('cheese');
        expect(res.body.price).toEqual(5);
        expect(res.body.category).toEqual('food');
    });

    it('get product by category', async () => {
        const res = await req.get(`/products/category/${cheese.category}`);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch('application/json');

        expect(res.body[0].name).toEqual('cheese');
        expect(res.body[0].price).toEqual(5);
        expect(res.body[0].category).toEqual('food');
    });

    it('gets all products', async () => {
        const res = await req.get('/products');

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch('application/json');

        expect(res.body.length).toEqual(2);

        expect(res.body[0].name).toEqual('cheese');
        expect(res.body[0].price).toEqual(5);
        expect(res.body[0].category).toEqual('food');

        expect(res.body[1].name).toEqual('car');
        expect(res.body[1].price).toEqual(1000);
        expect(res.body[1].category).toEqual('cars');
    });

    it('Edit product by id', async () => {
        const res = await req.put(`/products/${car.id}`).set('Authorization', `Bearer ${token}`).send({
            name: 'mercedes',
            price: 5000,
            category: 'cars'
        });

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch('application/json');
        expect(res.body.name).toEqual('mercedes');
        expect(res.body.price).toEqual(5000);
        expect(res.body.category).toEqual('cars');
    });

    it('delete product by id', async () => {
        const res = await req.delete(`/products/${car.id}`).set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch('application/json');
        expect(res.body.name).toEqual('mercedes');
    });
});
