import { ProductModel } from "../../src/models/product";

const store = new ProductModel();

describe('product model test', () => {

    describe('CRUD Exist', () => {
        it('check CRUD in product model', () => {
            expect(store.index).toBeDefined();
            expect(store.show).toBeDefined();
            expect(store.create).toBeDefined();
            expect(store.edit).toBeDefined();
            expect(store.delete).toBeDefined();
        });
    });

    describe('Test CRUD with data', () => {
        let id: string;

        it('create two new products', async () => {

            await store.create({
                name: 'jeans',
                price: 3,
                category: 'clothes'
            });

            const pro = await store.create({
                name: 't-shirt',
                price: 5,
                category: 'clothes'
            });
            id = (pro.id as string);
            expect(pro.name).toEqual('t-shirt');
            expect(pro.price).toEqual(5);
            expect(pro.category).toEqual('clothes');
        });

        it('edits a product', async () => {

            const pro = await store.edit({
                id: id,
                name: 'cheese',
                price: 1,
                category: 'food'
            });

            expect(pro.name).toEqual('cheese');
            expect(pro.price).toEqual(1);
            expect(pro.category).toEqual('food');
        });

        it('Get all products (should be only 2)', async () => {
            const res = await store.index();

            expect(res.length).toEqual(2);

            expect(res[0].name).toEqual('jeans');
            expect(res[0].price).toEqual(3);
            expect(res[0].category).toEqual('clothes');

            expect(res[1].name).toEqual('cheese');
            expect(res[1].price).toEqual(1);
            expect(res[1].category).toEqual('food');
        });

        it('get product by Id', async () => {
            const res = await store.show(id as string);

            expect(res.name).toEqual('cheese');
            expect(res.price).toEqual(1);
            expect(res.category).toEqual('food');
        });

        it('Delete the edited and show rest', async () => {
            await store.delete(id as string);
            const res = await store.index();

            expect(res.length).toEqual(1);
            expect(res[0].name).toEqual('jeans');
            expect(res[0].price).toEqual(3);
            expect(res[0].category).toEqual('clothes');
        });
        
        afterAll(async () => {
            await store.deleteAll();
        });
    });
});