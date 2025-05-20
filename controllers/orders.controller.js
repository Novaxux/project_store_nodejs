// import { randomUUID } from 'node:crypto';
import {
  OrderRepository,
  OrderProductRepository,
  ProductRepository,
} from '../models/Repositories.js';

const createOrder = async (req, res) => {
  const order = req.body;
  const idUser = req.session.user.id;
  let totalPrice = 0;
  const { insertId: idOrder } = await OrderRepository.insert(idUser);
  for (const element of order) {
    const product = await ProductRepository.select(element.id);
    const newStock = product.stock - element.amount;
    await ProductRepository.updateColumn(product.id, 'stock', newStock);
    const newOrderProduct = {
      idOrder: idOrder,
      idProduct: product.id,
      price: product.price,
      amount: element.amount,
    };
    totalPrice += newOrderProduct.price * newOrderProduct.amount;
    await OrderProductRepository.insert(newOrderProduct);
  }
  await OrderRepository.insertTotal(totalPrice, idOrder);
  return res.status(204).send();
};

const getOrders = async (req, res) => {
  const userId = req.session.user.id;
  const orders = await OrderRepository.selectAll(userId);
  res.json(orders);
};

export { createOrder, getOrders };
