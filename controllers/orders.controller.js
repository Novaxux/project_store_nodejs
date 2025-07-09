import {
  OrderRepository,
  OrderProductRepository,
  ProductRepository,
} from '../models/Repositories.js';

import { pool } from '../config/db.js';

const createOrder = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const order = req.body;
    const idUser = req.session.user.id;
    let totalPrice = 0;
    const { insertId: idOrder } = await OrderRepository.insert(
      idUser,
      connection
    );
    for (const { id, amount } of order) {
      const product = await ProductRepository.select(id, connection);
      const newOrderProduct = {
        idOrder: idOrder,
        idProduct: product.id,
        price: product.price,
        amount: amount,
      };
      totalPrice += newOrderProduct.price * newOrderProduct.amount;
      await OrderProductRepository.insert(newOrderProduct, connection);
    }
    await OrderRepository.insertTotal(totalPrice, idOrder, connection);
    await connection.commit();
    return res.status(201).json({ message: 'Order placed successfully' });
  } catch {
    await connection.rollback();
    return res.status(500).json({ message: 'Error creating the order' });
  } finally {
    connection.release(); // ← libera la conexión al pool
  }
};

const getOrders = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const orders = await OrderRepository.selectAll(userId);
    return res.json(orders);
  } catch {
    return res.status(500).json({ message: 'Error retrieving orders' });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id: idOrder } = req.params;
    const { id: idUser } = req.session.user;
    const products = await OrderProductRepository.select(idUser, idOrder);
    return res.json(products);
  } catch {
    return res.status(500).json({ message: 'Error retrieving order details' });
  }
};
export { createOrder, getOrders, getOrderDetails };
