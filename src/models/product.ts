import Database from '../database';

export type Product = {
   id?: string;
   name: string;
   price: number;
   category: string;
};

export class ProductModel {
   async index(): Promise<Product[]> {
      try {
         const conn = await Database.connect();
         const result = await conn.query('SELECT * FROM products');
         conn.release();

         return result.rows;
      } catch (error) {
         throw new Error(`Error getting All products: ${error}`);
      }
   }

   async show(id: string): Promise<Product> {
      try {
         const conn = await Database.connect();
         const result = await conn.query(
            'SELECT * FROM products WHERE id= $1',
            [id]
         );
         conn.release();

         return result.rows[0];
      } catch (error) {
         throw new Error(`Error getting products of id ${id}: ${error}`);
      }
   }

   async create(product: Product): Promise<Product> {
      try {
         const conn = await Database.connect();
         const result = await conn.query(
            'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *',
            [product.name, product.price, product.category]
         );
         conn.release();

         return result.rows[0];
      } catch (error) {
         throw new Error(`Error insert into products : ${error}`);
      }
   }

   async edit(product: Product): Promise<Product> {
      try {
         const conn = await Database.connect();
         const result = await conn.query(
            'UPDATE products SET name = $2, price = $3, category = $4 WHERE id=$1 RETURNING *',
            [product.id, product.name, product.price, product.category]
         );
         conn.release();

         return result.rows[0];
      } catch (error) {
         throw new Error(`Error update products : ${error}`);
      }
   }

   async delete(id: string): Promise<Product> {
      try {
         const conn = await Database.connect();
         const result = await conn.query(
            `DELETE FROM products WHERE id=($1) RETURNING *`,
            [id]
         );
         conn.release();

         return result.rows[0];
      } catch (error) {
         throw new Error(`delete product of id : ${error}`);
      }
   }

   async deleteAll(): Promise<Product[]> {
      try {
         const conn = await Database.connect();
         const result = await conn.query(`DELETE FROM products RETURNING *`);
         conn.release();
         return result.rows;
      } catch (error) {
         throw new Error(`delete all entries in products faild: ${error}`);
      }
   }

   // Products by category
   async productsByCategory(category: string): Promise<Product[]> {
      try {
         const conn = await Database.connect();
         const result = await conn.query(
            'SELECT * FROM products WHERE category=$1',
            [category]
         );
         conn.release();

         return result.rows;
      } catch (error) {
         throw new Error(`productsByCategory faild: ${error}`);
      }
   }

   async mostPopularproducts(): Promise<Product[]> {
      try {
         const conn = await Database.connect();
         const result = await conn.query(
            'SELECT * FROM products WHERE id IN( SELECT product_id FROM order_product group by product_id ORDER BY SUM(quantity) DESC LIMIT 5) '
         );
         conn.release();

         return result.rows;
      } catch (error) {
         throw new Error(`productsByCategory faild: ${error}`);
      }
   }
}
