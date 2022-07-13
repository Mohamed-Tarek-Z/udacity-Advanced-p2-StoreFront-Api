import Database from '../database';

export type Order = {
   id?: string;
   user_id: string;
   status: string;
};

export type Order_Product = {
   id?: string;
   order_id: string;
   product_id: string;
   quantity: number;
};

export class OrderModel {
   async index(): Promise<Order[]> {
      try {
         const conn = await Database.connect();
         const result = await conn.query('SELECT * FROM orders');
         conn.release();

         return result.rows;
      } catch (error) {
         throw new Error(`Error getting All orders: ${error}`);
      }
   }

   async show(id: string): Promise<Order> {
      try {
         const conn = await Database.connect();
         const result = await conn.query('SELECT * FROM orders WHERE id = $1', [
            id,
         ]);
         conn.release();

         return result.rows[0];
      } catch (error) {
         throw new Error(`Error getting orders of id ${id}: ${error}`);
      }
   }

   async create(order: Order): Promise<Order> {
      try {
         const conn = await Database.connect();
         const result = await conn.query(
            'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *',
            [order.user_id, order.status]
         );
         conn.release();

         return result.rows[0];
      } catch (error) {
         throw new Error(`Error insert into orders : ${error}`);
      }
   }

   async edit(order: Order): Promise<Order> {
      try {
         const conn = await Database.connect();
         const result = await conn.query(
            'UPDATE orders SET user_id = $2, status = $3 WHERE id=$1 RETURNING *',
            [order.id, order.user_id, order.status]
         );
         conn.release();

         return result.rows[0];
      } catch (error) {
         throw new Error(`Error update orders : ${error}`);
      }
   }

   async delete(id: string): Promise<Order> {
      try {
         const conn = await Database.connect();
         const result = await conn.query(
            `DELETE FROM orders WHERE id=($1) RETURNING *`,
            [id]
         );
         conn.release();

         return result.rows[0];
      } catch (error) {
         throw new Error(`delete order of id : ${error}`);
      }
   }

   async deleteAll(): Promise<Order[]> {
      try {
         const conn = await Database.connect();
         const result = await conn.query(`DELETE FROM orders RETURNING *`);
         conn.release();

         return result.rows;
      } catch (error) {
         throw new Error(`delete all entries in orders faild: ${error}`);
      }
   }

   async currentOrderByUser(user_id: string): Promise<Order> {
      try {
         const conn = await Database.connect();
         const result = await conn.query(
            'SELECT * FROM orders WHERE user_id = $1 AND status = $2 ORDER BY id DESC',
            [user_id, 'active']
         );
         conn.release();

         return result.rows[0];
      } catch (error) {
         throw new Error(`faild to get completed orders: ${error}`);
      }
   }

   //Completed Orders by user
   async completedOrdersByUser(user_id: string): Promise<Order[]> {
      try {
         const conn = await Database.connect();
         const result = await conn.query(
            'SELECT * FROM orders WHERE user_id = $1 AND status = $2',
            [user_id, 'complete']
         );
         conn.release();

         return result.rows;
      } catch (error) {
         throw new Error(`faild to get completed orders: ${error}`);
      }
   }

   // order_product

   async addProduct(order_product: Order_Product): Promise<Order_Product> {
      try {
         const conn = await Database.connect();
         const result = await conn.query(
            'INSERT INTO order_product (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *',
            [
               order_product.order_id,
               order_product.product_id,
               order_product.quantity,
            ]
         );
         conn.release();

         return result.rows[0];
      } catch (error) {
         throw new Error(`Adding product to order faild: ${error}`);
      }
   }

   async GetAllOfOrder_Prod(): Promise<Order_Product[]> {
      try {
         const conn = await Database.connect();
         const result = await conn.query('SELECT * FROM order_product');
         conn.release();

         return result.rows;
      } catch (error) {
         throw new Error(`faild to get completed orders: ${error}`);
      }
   }

   async editOrder_Product(
      order_product: Order_Product
   ): Promise<Order_Product> {
      try {
         const conn = await Database.connect();
         const result = await conn.query(
            'UPDATE order_product SET order_id = $2, product_id = $3, quantity = $4 WHERE id=$1 RETURNING *',
            [
               order_product.id,
               order_product.order_id,
               order_product.product_id,
               order_product.quantity,
            ]
         );
         conn.release();

         return result.rows[0];
      } catch (error) {
         throw new Error(`editing OrderProduct faild: ${error}`);
      }
   }

   async removeRecordFromOrder_Product(
      ordprod_id: string
   ): Promise<Order_Product> {
      try {
         const conn = await Database.connect();
         const result = await conn.query(
            'DELETE FROM order_product WHERE id= $1 RETURNING *',
            [ordprod_id]
         );
         conn.release();

         return result.rows[0];
      } catch (error) {
         throw new Error(`removing product from order faild: ${error}`);
      }
   }

   async removeProductFromOrder(
      pro_id: string,
      order_id: string
   ): Promise<Order_Product[]> {
      try {
         const conn = await Database.connect();
         const result = await conn.query(
            'DELETE FROM order_product WHERE order_id= $2 and product_id = $1 RETURNING *',
            [pro_id, order_id]
         );
         conn.release();

         return result.rows;
      } catch (error) {
         throw new Error(`removing product from order faild: ${error}`);
      }
   }

   async removeAllProductsInOrder(order_id: string): Promise<Order_Product[]> {
      try {
         const conn = await Database.connect();
         const result = await conn.query(
            `DELETE FROM order_product WHERE order_id= $1 RETURNING *`,
            [order_id]
         );
         conn.release();
         return result.rows;
      } catch (error) {
         throw new Error(`delete all entries in order_product faild: ${error}`);
      }
   }

   async clear_orderproducts(): Promise<Order_Product[]> {
      try {
         const conn = await Database.connect();
         const result = await conn.query(
            `DELETE FROM order_product RETURNING *`
         );
         conn.release();

         return result.rows;
      } catch (error) {
         throw new Error(`delete all entries in order_product faild: ${error}`);
      }
   }
}
