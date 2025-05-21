export const validateOrder = async (req, res, next) => {
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
  next();
};
