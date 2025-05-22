import { JWT_SECRET_KEY, SALT_ROUNDS } from '../config/config.js';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';
import bcrypt from 'bcrypt';
import { UserRepository } from '../models/Repositories.js';

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const found = await UserRepository.select(username);
    if (!found)
      return res.status(400).json({ message: 'username does not exists' });
    const validatePassword = await bcrypt.compare(password, found.password);
    if (!validatePassword)
      return res.status(400).json({ message: 'password is incorrect' });
    const { password: _, ...userData } = found;
    const token = jwt.sign(userData, JWT_SECRET_KEY, {
      expiresIn: '1hr',
    });
    res
      .cookie('access_token', token, {
        httpOnly: true,
        sameSite: 'Strict',
        maxAge: 1000 * 60 * 60,
      })
      .json(userData);
  } catch (error) {
    return res.json({ message: error.message });
  }
};

const validateSession = (req, res) => {
  const { user } = req.session;
  res.json({ user });
};
const logoutUser = (req, res) => {
  res.clearCookie('access_token').json({ message: 'logout succesfull' });
};

const signUp = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userFound = await UserRepository.select(username);
    if (userFound)
      return res
        .status(400)
        .json({ message: `Username ${username} already exists` });
    const id = randomUUID();
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    await UserRepository.insert({
      id,
      username,
      password: hashedPassword,
      role: 'client',
    });
    res.json({ username, id });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

const getClients = async (req, res) => {
  try {
    const _users = await UserRepository.selectAll();
    return res.json(_users);
  } catch {
    return res.status(500);
  }
};

export { login, validateSession, signUp, logoutUser, getClients };
