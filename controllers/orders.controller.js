// import { randomUUID } from 'node:crypto';
import {
  OrderRepository,
  OrderProductRepository,
  ProductRepository,
} from '../models/Repositories.js';

// let orders = [];
// let order_product = [];

const createOrder = async (req, res) => {
  const order = req.body;
  const idUser = req.session.user.id;
  // const newDate = new Date().toLocaleDateString();
  let totalPrice = 0;
  // const newOrder = {
  //   id: randomUUID(),
  //   idUser: idUser,
  //   date: newDate,
  //   total: null,
  // };
  const {insertId: idOrder} = await OrderRepository.insert(idUser);
  // orders.push(newOrder);
  for (const element in order) {
    // let index = products.findIndex((p) => p.id == element.id);
    const product = await ProductRepository.select(element.id);
    const newStock = product.stock - element.amount
    console.log(element.amount)
    // products[index].stock -= element.amount;
    await ProductRepository.updateColumn(product.id, 'stock', newStock);
    
    // const newOrderProduct = {
    //   idOrder: idOrder,
    //   idProduct: products[index].id,
    //   price: products[index].price,
    //   amount: element.amount,
    // };
    const newOrderProduct = {
      idOrder: idOrder,
      idProduct: product.id,
      price: product.price,
      amount: element.amount,
    };
    totalPrice += newOrderProduct.price * newOrderProduct.amount;
    await OrderProductRepository.insert(newOrderProduct);
    // order_product.push(newOrderProduct);
  }

  // const indexOrder = orders.findIndex((o) => o.id == newOrder.id);
  // orders[indexOrder].total = totalPrice;
  await OrderRepository.insertTotal(totalPrice)
  return res.status(204).send();
};

const getOrders = async (req, res) => {
  const userId = req.session.user.id
  const orders = await OrderRepository.selectAll(userId)
  // const orderUser = orders.filter((o) => o.idUser == req.session.user.id);
  res.json(orders);
};

// const getOrderDetails = (req, res) => {
//   const orderUser = orders.filter((o) => o.idUser == req.session.user.id && o.id == req.params.id);
//   const orderDetails =

// };

export { createOrder, getOrders };
