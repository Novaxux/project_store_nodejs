import { response } from 'express';
import { users } from './auth.controller.js';
import { products } from './products.controller.js';
import { randomUUID } from 'node:crypto';
let orders = [{ id: 1, idUser: '12df', date: '1/2/3', total: 1223 }];
let order_product = [];

const makeOrder = (req, res) => {
  const order = req.body;
  // middleware
  if (!order.length() > 0)
    return res.status(400).json({ message: 'No products to order' });
  order.forEach((element) => {
    let productFound = products.findIndex((p) => p.id == element.id);
    // let productFound = ProductRepository.select(id);
    if (!productFound)
      return res
        .status(404)
        .json({ message: `product with id ${element.id} not found` });
    if (!productFound.stock >= element.amount)
      return res.status(409).json({
        message: `"Insufficient stock for the product ${productFound.name}`,
      });
  });
  const idUser = req.session.user.id;
  const newDate = new Date().toLocaleDateString();
  const newOrder = {
    id: randomUUID(),
    idUser: idUser,
    date: newDate,
    total: null,
  };
};
