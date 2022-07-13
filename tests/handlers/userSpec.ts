import app from '../../src/server';
import { User } from '../../src/models/user';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';

const req = supertest(app);

describe('Tests user endpoints', () => {
    let token: string;
    let user: User;

    afterAll(async () => {
        await req.delete('/users').set('Authorization', `Bearer ${token}`);
    });

    it('register and a new user', async () => {
        const res = await req.post('/users').send({
            user_name: 'momo',
            first_name: 'mohamed',
            last_name: 'tarek',
            password: '111'
        });
        token = res.body as string;
        user = jwt.decode(token) as User;

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch('application/json');
        expect(user.user_name).toEqual('momo');
        expect(user.first_name).toEqual('mohamed');
        expect(user.last_name).toEqual('tarek');
    });

    it('login a user', async () => {
        const res = await req.post('/users/login').send({
            user_name: 'momo',
            password: '111'
        });
        token = res.body as string;
        user = jwt.decode(token) as User;

        expect(res.headers['content-type']).toMatch('application/json');
        expect(res.status).toBe(200);
        expect(user.user_name).toEqual('momo');
        expect(user.first_name).toEqual('mohamed');
        expect(user.last_name).toEqual('tarek');
    });

    it('get user with id ', async () => {
        const res = await req.get(`/users/${user.id}`).set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch('application/json');
        expect(res.body.user_name).toEqual('momo');
        expect(res.body.first_name).toEqual('mohamed');
        expect(res.body.last_name).toEqual('tarek');

    });

    it('get all users', async () => {
        const res = await req.get('/users').set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch('application/json');
        expect(res.body[0].user_name).toEqual('momo');
        expect(res.body[0].first_name).toEqual('mohamed');
        expect(res.body[0].last_name).toEqual('tarek');
    });
});
