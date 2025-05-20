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

const createProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    await ProductRepository.insert({ name, price, stock });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
  res.json({ message: 'product created' });
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock } = req.body;
    await ProductRepository.update(parseInt(id), { name, price, stock });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
  res.send();
};

export { getProduct, getProducts, createProduct, editProduct };
