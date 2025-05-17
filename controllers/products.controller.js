let products = [
  { id: 1, name: 'apple', price: 2, stock: 3 },
  { id: 2, name: 'durian', price: 3, stock: 3 },
];

const getProducts = (req, res) => {
  res.json(products);
};

const getProduct = (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id == id);
  if (!product) return res.status(404).send();
  return res.json(product);
};

const createProduct = (req, res) => {
  const product = req.body;
  products.push(product);
  res.json({message: 'product created'})
};

export { getProduct, getProducts, createProduct, products };
