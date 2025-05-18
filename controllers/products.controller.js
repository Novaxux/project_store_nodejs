import { ProductRepository } from '../models/productRepository.js';
let products = [
  { id: 1, name: 'apple', price: 2, stock: 3 },
  { id: 2, name: 'durian', price: 3, stock: 3 },
];

const getProducts = async (req, res) => {
  const p = await ProductRepository.selectAllproducts();
  res.json(p);
};

const getProduct = (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id == id);
  if (!product) return res.status(404).send();
  return res.json(product);
};

const createProduct = (req, res) => {
  const { name, price, stock } = req.body;
  ProductRepository.insert({ name, price, stock });
  res.json({ message: 'product created' });
};

const editProduct = (req, res) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;
  ProductRepository.update(parseInt(id), { name, price, stock });
  res.send();
};

export { getProduct, getProducts, createProduct, editProduct, products };
