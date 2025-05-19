import { ProductRepository } from '../models/Repositories.js';

const getProducts = async (req, res) => {
  const p = await ProductRepository.selectAll();
  res.json(p);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await ProductRepository.select(id);
  if (product.length == 0) return res.status(404).send();
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

export { getProduct, getProducts, createProduct, editProduct };
