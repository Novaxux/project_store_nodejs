import { pool } from '../config/db.js';
export class ProductRepository {
  static select = async (id) => {
    const [product] = await pool.query(`SELECT * FROM products where id = ?`, [
      id,
    ]);
    return product[0];
  };

  static selectAll = async () => {
    const [result] = await pool.query(`SELECT * FROM products`);
    return result;
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

  static updateColumn = async (id, column, value) => {
    await pool.query(`UPDATE products SET ${column}= ? where id = ?`, [value, id]);
  };
}

export class UserRepository {
  static select = async (username) => {
    const user = await pool.query(`SELECT * FROM users where username = ?`, [
      username,
    ]);
    return user[0][0];
  };
  static selectAll = async () => {
    const result = await pool.query(`SELECT * FROM users`);
    return result[0];
  };
  static insert = async ({ id, username, password, role }) => {
    await pool.query(
      'INSERT INTO users (id, username, password, role) VALUES (?, ?, ?, ?)',
      [id, username, password, role]
    );
  };
}

export class OrderRepository {
  static selectAll = async (idUser) => {
    const result = await pool.query(`SELECT * FROM orders where id_user = ?`, [
      idUser,
    ]);
    return result[0];
  };
    static insert = async (idUser) => {
    const [result] = await pool.query(
      'INSERT INTO orders (id_user, date) VALUES (?, NOW())',
      [idUser]
    );
    return result;
  };
  static insertTotal = async (total, idOrder) => {
    await pool.query('UPDATE  orders SET total = ? where id = ?', [total, idOrder]);
  };
}

export class OrderProductRepository {
  static insert = async ( {idOrder, idProduct, price, amount} ) => {
    await pool.query('INSERT INTO order_product (id_order, id_product, price, amount) VALUES (?, ?, ?, ?)', [
      idOrder, idProduct, price, amount,
    ]);
  };
}
