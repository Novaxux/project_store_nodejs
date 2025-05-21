// import { randomUUID } from 'node:crypto';
import {
  OrderRepository,
  OrderProductRepository,
  ProductRepository,
} from '../models/Repositories.js';

const createOrder = async (req, res) => {
  try {
    const order = req.body;
    const idUser = req.session.user.id;
    let totalPrice = 0;
    const { insertId: idOrder } = await OrderRepository.insert(idUser);
    for (const element of order) {
      const product = await ProductRepository.select(element.id);
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
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
  return res.status(204).send();
};

const getOrders = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const orders = await OrderRepository.selectAll(userId);
    res.json(orders);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getOrderDetails = (req, res) => {
 try {
   const { id } = req.params;
   
 } catch (error) {
   return res.status(400).json({ message: error.message });
 }

};
export { createOrder, getOrders };
