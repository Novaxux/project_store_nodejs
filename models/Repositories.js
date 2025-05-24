import { pool } from '../config/db.js';
export class ProductRepository {
  static select = async (id, conn) => {
    const [product] = await conn.query(`SELECT * FROM products where id = ?`, [
      id,
    ]);
    return product[0];
  };
  static selectAll = async () => {
    const [result] = await pool.query(`SELECT * FROM products`);
    return result;
  };
  static insert = async ({ name, price, stock, image }) => {
    await pool.query(
      'INSERT INTO products (name, price, stock, image) VALUES (?, ?, ?, ?)',
      [name, price, stock, image]
    );
  };
  static selectByName = async (name) => {
    const [products] = await pool.query(
      `SELECT * FROM products WHERE name LIKE ?`,
      [`%${name}%`]
    );
    return products;
  };
  // receive as an object to avoid unordened inserting
  static update = async (id, { name, price, stock, image }) => {
    const product = await pool.query(
      'UPDATE products SET name = ?, price = ?, stock = ?, image = ? where id = ?',
      [name, price, stock, image, id]
    );
    return product;
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
    const result = await pool.query(`SELECT id, date, total FROM orders where id_user = ?`, [
      idUser,
    ]);
    return result[0];
  };
  static insert = async (idUser, conn) => {
    const [result] = await conn.query(
      'INSERT INTO orders (id_user, date) VALUES (?, NOW())',
      [idUser]
    );
    return result;
  };
  static insertTotal = async (total, idOrder, conn) => {
    await conn.query('UPDATE  orders SET total = ? where id = ?', [
      total,
      idOrder,
    ]);
  };
}

export class OrderProductRepository {
  static insert = async ({ idOrder, idProduct, price, amount }, conn) => {
    await conn.query(
      'INSERT INTO order_product (id_order, id_product, price, amount) VALUES (?, ?, ?, ?)',
      [idOrder, idProduct, price, amount]
    );
  };
  static select = async (idUser, idOrder) => {
    const [products] = await pool.query(
      `SELECT 
        op.id_product, 
        op.price, 
        op.amount, 
      p.name AS product_name
      FROM order_product op
      JOIN orders o ON op.id_order = o.id
      JOIN products p ON op.id_product = p.id
      WHERE o.id_user = ? AND o.id = ?;
`,
      [idUser, idOrder]
    );
    return products;
  };
}
