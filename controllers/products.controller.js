import { ProductRepository } from '../models/Repositories.js';

const getProducts = async (req, res) => {
  try {
    const products = await ProductRepository.selectAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
const searchProducts = async (req, res) => {
  try {
    console.log('accediste')
    const { name } = req.query;
    if (!name) return res.status(400).json({ message: 'Missing name' });
    const products = await ProductRepository.selectByName(name);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductRepository.select(id);
    if (!product || product.length === 0)
      return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    await ProductRepository.insert({ name, price, stock });
    res.status(201).json({ message: 'Product created' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock } = req.body;
    const result = await ProductRepository.update(parseInt(id), {
      name,
      price,
      stock,
    });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Product not found' });

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { getProduct, getProducts, createProduct, editProduct, searchProducts };
