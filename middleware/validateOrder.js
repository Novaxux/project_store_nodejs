import { ProductRepository } from "../models/Repositories.js";

export const validateOrder = (req, res, next) => {
  const order = req.body;
  // middleware
  if (!order.length > 0)
    return res.status(400).json({ message: 'No products to order' });

  //ids of products can't be repeated
  const items = req.body;
  const ids = items.map((item) => item.id);
  const uniqueIds = new Set(ids);
  if (ids.length !== uniqueIds.size) {
    return res.status(400).json({
      message: 'Duplicate product IDs are not allowed in the order.',
    });
  }

  for (const element of order) {
    let productFound = ProductRepository.select(id);
    if (!productFound)
      return res
        .status(404)
        .json({ message: `product with id ${element.id} not found` });
    if (productFound.stock < element.amount)
      return res.status(409).json({
        message: `Insufficient stock for the product ${productFound.name}, stock: ${productFound.stock}`,
      });
  }
  next();
};
