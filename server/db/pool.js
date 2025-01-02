import dotenv from "dotenv";
import pg from "pg";
dotenv.config();
const pool = new pg.Pool({
  hostname: process.env.DB_HOSTNAME,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
});
export default pool;
