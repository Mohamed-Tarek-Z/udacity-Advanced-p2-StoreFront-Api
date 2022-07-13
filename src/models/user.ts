import Database from '../database';
import bcrypt from 'bcrypt';

export type User = {
   id?: string;
   user_name: string;
   first_name: string;
   last_name: string;
   password: string;
};

export class UserModel {
   private pepper = process.env.BCRYPT_PASSWORD as string;
   private saltRounds = parseInt(process.env.SALT_ROUNDS as string);

   async index(): Promise<User[]> {
      try {
         const conn = await Database.connect();
         const result = await conn.query('SELECT * FROM users');
         conn.release();

         return result.rows;
      } catch (error) {
         throw new Error(`Error getting All users: ${error}`);
      }
   }

   async show(id: string): Promise<User> {
      try {
         const conn = await Database.connect();
         const result = await conn.query('SELECT * FROM users WHERE id = $1', [
            id,
         ]);
         conn.release();

         return result.rows[0];
      } catch (error) {
         throw new Error(`Error getting User of id ${id}: ${error}`);
      }
   }

   async create(user: User): Promise<User> {
      try {
         const conn = await Database.connect();
         const hash = bcrypt.hashSync(
            user.password + this.pepper,
            this.saltRounds
         );
         const result = await conn.query(
            `INSERT INTO users (user_name, first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING *`,
            [user.user_name, user.first_name, user.last_name, hash]
         );
         conn.release();
         return result.rows[0];
      } catch (error) {
         throw new Error(`create new user faild  : ${error}`);
      }
   }

   async edit(user: User): Promise<User> {
      try {
         const conn = await Database.connect();
         const hash = bcrypt.hashSync(
            `${user.password}${this.pepper}`,
            this.saltRounds
         );
         const result = await conn.query(
            `UPDATE users SET user_name = $2, first_name = $3, last_name = $4, password = $5 WHERE id=$1 RETURNING *`,
            [user.id, user.user_name, user.first_name, user.last_name, hash]
         );

         conn.release();

         return result.rows[0];
      } catch (error) {
         throw new Error(`edit faild : ${error}`);
      }
   }

   async delete(id: string): Promise<User> {
      try {
         const conn = await Database.connect();
         const result = await conn.query(
            `DELETE FROM users WHERE id=($1) RETURNING *`,
            [id]
         );
         conn.release();

         return result.rows[0];
      } catch (error) {
         throw new Error(`delete user by id faild : ${error}`);
      }
   }

   async deleteAll(): Promise<User[]> {
      try {
         const conn = await Database.connect();
         const result = await conn.query(`DELETE FROM users RETURNING *`);
         conn.release();

         return result.rows;
      } catch (error) {
         throw new Error(`delete All users : ${error}`);
      }
   }

   async authenticate(
      user_name: string,
      password: string
   ): Promise<User | string> {
      try {
         const conn = await Database.connect();
         const result = await conn.query(
            'SELECT * FROM users WHERE user_name= $1',
            [user_name]
         );
         conn.release();

         if (result.rows.length) {
            if (
               bcrypt.compareSync(
                  password + this.pepper,
                  result.rows[0].password
               )
            ) {
               return result.rows[0];
            } else {
               return 'wrong password';
            }
         }
         return 'wrong username';
      } catch (error) {
         throw new Error(`query in auth faild: ${error}`);
      }
   }
}
