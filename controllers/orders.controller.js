import { products } from './products.controller.js';
import { randomUUID } from 'node:crypto';
let orders = [];
let order_product = [];

const createOrder = (req, res) => {
  const order = req.body;
  const idUser = req.session.user.id;
  const newDate = new Date().toLocaleDateString();
  let totalPrice = 0;
  const newOrder = {
    id: randomUUID(),
    idUser: idUser,
    date: newDate,
    total: null,
  };
  orders.push(newOrder);

  order.forEach((element) => {
    let index = products.findIndex((p) => p.id == element.id);
    products[index].stock -= element.amount;
    const newOrderProduct = {
      idOrder: newOrder.id,
      idProduct: products[index].id,
      price: products[index].price,
      amount: element.amount,
    };
    totalPrice += newOrderProduct.price * newOrderProduct.amount;
    order_product.push(newOrderProduct);
  });

  const indexOrder = orders.findIndex((o) => o.id == newOrder.id);
  orders[indexOrder].total = totalPrice;
  return res.status(204).send();
};

const getOrders = (req, res) => {
  const orderUser = orders.filter((o) => o.idUser == req.session.user.id);
  res.json(orderUser);
};

// const getOrderDetails = (req, res) => {
//   const orderUser = orders.filter((o) => o.idUser == req.session.user.id && o.id == req.params.id);
//   const orderDetails =

// };

export { createOrder, getOrders };
