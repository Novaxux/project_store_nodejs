import { pool } from '../config/db.js';
export class ProductRepository {
  static selectAllproducts = async () => {
    const result = await pool.query(`select * from products`);
    return result[0];
  };
  static insert = async ({ name, price, stock }) => {
    await pool.query(
      'INSERT INTO products (name, price, stock) VALUES (?, ?, ?)',
      [name, price, stock]
    );
  };
  // receive as an object to avoid unordened inserting
  static update = async (id, { name, price, stock }) => {
    await pool.query(
      'UPDATE products SET name = ?, price = ?, stock = ? where id = ?',
      [name, price, stock, id]
    );
  };
}
