import { UserModel } from "../../src/models/user";

const store = new UserModel();

describe('user model test', () => {

    describe('CRUD Exist', () => {
        it('check CRUD in user model', () => {
            expect(store.index).toBeDefined();
            expect(store.show).toBeDefined();
            expect(store.create).toBeDefined();
        });
    });

    describe('Test CRUD with data', () => {
        let id: string;

        
        afterAll(async () => {
            await store.deleteAll();
        });

        it('create two new users', async () => {

            await store.create({
                user_name: 'momo',
                first_name: 'mohamed',
                last_name: 'tarek',
                password: '123'
            });

            const user = await store.create({
                user_name: 'MT',
                first_name: 'anas',
                last_name: 'tarek',
                password: '111',
            });
            id = (user.id as string);
            expect(user.user_name).toEqual('MT');
            expect(user.first_name).toEqual('anas');
            expect(user.last_name).toEqual('tarek');
            expect(user.password).not.toEqual('111');
        });

        it('Get all users (should be only 2)', async () => {
            const res = await store.index();

            expect(res.length).toEqual(2);

            expect(res[0].user_name).toEqual('momo');
            expect(res[0].first_name).toEqual('mohamed');
            expect(res[0].last_name).toEqual('tarek');
            expect(res[0].password).not.toEqual('123');

            expect(res[1].user_name).toEqual('MT');
            expect(res[1].first_name).toEqual('anas');
            expect(res[1].last_name).toEqual('tarek');
            expect(res[1].password).not.toEqual('111');
        });

        it('get user by Id', async () => {
            const res = await store.show(id as string);

            expect(res.user_name).toEqual('MT');
            expect(res.first_name).toEqual('anas');
            expect(res.last_name).toEqual('tarek');
            expect(res.password).not.toEqual('111');
        });

        it('authenticate User (Correct username and password)', async () => {
            const res = await store.authenticate('MT', '111');

            if (typeof res != 'string') {
                expect(res.user_name).toEqual('MT');
                expect(res.first_name).toEqual('anas');
                expect(res.last_name).toEqual('tarek');
            }
        });

        it('authenticate User (Worng username and password)', async () => {
            const result = await store.authenticate('asd', 'dsa');

            expect(result).toContain('wrong');
        });
    });
});