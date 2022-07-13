import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config({ debug: true, override: true });

const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, TEST_DB, ENV } =
   process.env;

const dataname = ENV === 'test' ? TEST_DB : POSTGRES_DB;

const Database = new Pool({
   host: POSTGRES_HOST,
   database: dataname,
   user: POSTGRES_USER,
   password: POSTGRES_PASSWORD,
});

export default Database;
