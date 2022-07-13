import { OrderModel } from "../../src/models/order";
import { UserModel } from "../../src/models/user";
import { ProductModel } from "../../src/models/product";

const store = new OrderModel();
const userModel = new UserModel();
const proModel = new ProductModel();

describe('order model test', () => {

    describe('CRUD Exist', () => {
        it('check CRUD in order model', () => {
            expect(store.index).toBeDefined();
            expect(store.show).toBeDefined();
            expect(store.create).toBeDefined();
            expect(store.completedOrdersByUser).toBeDefined();
            expect(store.currentOrderByUser).toBeDefined();
        });
    });

    describe('Test CRUD with data', () => {
        let id: string;
        let user_id: string;

        beforeAll(async () => {
            await userModel.create({
                user_name: 'momo',
                first_name: 'mohamed',
                last_name: 'tarek',
                password: '123'
            });

            const user = await userModel.create({
                user_name: 'MT',
                first_name: 'anas',
                last_name: 'tarek',
                password: '111'
            });

            user_id = user.id as string;
        });

        afterAll(async () => {
            await store.deleteAll();
            await userModel.deleteAll();
        });

        it('create two new orders', async () => {

            await store.create({
                user_id: user_id,
                status: 'complete'
            });

            const order = await store.create({
                user_id: user_id,
                status: 'active'
            });
            id = (order.id as string);
            expect(order.user_id).toEqual(`${user_id}`);
            expect(order.status).toEqual('active');
        });

        it('Get all orders (should be only 2)', async () => {
            const res = await store.index();

            expect(res.length).toEqual(2);

            expect(res[0].user_id).toEqual(`${user_id}`);
            expect(res[0].status).toEqual('complete');

            expect(res[1].user_id).toEqual(`${user_id}`);
            expect(res[1].status).toEqual('active');
        });

        it('get order by Id', async () => {
            const res = await store.show(id as string);

            expect(res.user_id).toEqual(`${user_id}`);
            expect(res.status).toEqual('active');
        });

        it('get current order by User_Id', async () => {
            const order = await store.currentOrderByUser(user_id as string);

            expect(order.user_id).toEqual(`${user_id}`);
            expect(order.status).toEqual('active');
        });

        it('get completed orders by user_Id', async () => {
            const res = await store.completedOrdersByUser(user_id as string);

            expect(res.length).toEqual(1);
            expect(res[0].user_id).toEqual(`${user_id}`);
            expect(res[0].status).toEqual('complete');
        });
    });
});


describe('order_product model test', () => {

    describe('CRUD Exist', () => {
        it('check CRUD in order_product model', () => {
            expect(store.addProduct).toBeDefined();
            expect(store.removeRecordFromOrder_Product).toBeDefined();
            expect(store.removeAllProductsInOrder).toBeDefined();
        });
    });

    describe('Test CRUD with data', () => {
        let id: string;
        let user_id: string;
        let order_id: string;
        let pro_id: string;
        let order2_id: string;
        let pro2_id: string;

        beforeAll(async () => {

            await store.clear_orderproducts();
            await store.deleteAll();
            await userModel.deleteAll();
            await proModel.deleteAll();

            const user = await userModel.create({
                user_name: 'MT',
                first_name: 'anas',
                last_name: 'tarek',
                password: '111'
            });
            user_id = user.id as string;

            let pro = await proModel.create({
                name: 'car',
                price: 100,
                category: 'cars'
            });
            pro_id = pro.id as string;

            let order = await store.create({
                user_id: user_id,
                status: 'active'
            });
            order_id = order.id as string;

            pro = await proModel.create({
                name: 'cheese',
                price: 5,
                category: 'food'
            });
            pro2_id = pro.id as string;

            order = await store.create({
                user_id: user_id,
                status: 'complete'
            });
            order2_id = order.id as string;
        });

        afterAll(async () => {
            await store.clear_orderproducts();
            await store.deleteAll();
            await userModel.deleteAll();
            await proModel.deleteAll();
        });

        it('create two new order_product', async () => {

            await store.addProduct({ order_id: order2_id, product_id: pro2_id, quantity: 50 });

            const order_product = await store.addProduct({ order_id: order_id, product_id: pro_id, quantity: 2 });
            id = (order_product.id as string);
            expect(order_product.order_id).toEqual(`${order_id}`);
            expect(order_product.quantity).toEqual(2);
        });

        it('edit current order_product by id', async () => {
            const order_product = await store.editOrder_Product({
                id: id,
                order_id: order_id,
                product_id: pro_id,
                quantity: 5
            });
            expect(order_product.quantity).toEqual(5);
        });

        it('remove record from order_product ', async () => {
            await store.removeRecordFromOrder_Product(id as string);
            const res = await store.GetAllOfOrder_Prod();
            expect(res.length).toEqual(1);
        });
    });
});