import { JWT_SECRET_KEY, SALT_ROUNDS } from '../config/config.js';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';
import bcrypt from 'bcrypt';

let users = [
  { id: randomUUID(), username: 'Manuel', password: bcrypt.hashSync('12345',2), role: 'admin' },
];

const login = async (req, res) => {
  const { username, password } = req.body;
  const found = users.find(
    (u) => u.username == username
  );
  if (!found) return res.status(400).json({message: 'username does not exists'});
  const validatePassword = await bcrypt.compare(password, found.password);
  if (!validatePassword) return res.status(400).json({message: 'password is incorrect'});
  // userRepository.selectUser({username})
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
    .send();
};

const validateSession = (req, res) => {
  const { user } = req.session;
  res.json({ valid: true, ...user });
};
const logoutUser = (req, res) => {
  res.clearCookie('access_token').json({ message: 'logout succesfull' });
};

const signUp = async (req, res) => {
  const { username, password } = req.body;
  const userFound = users.find((u) => u.username === username);
  if (userFound)
    return res
      .status(400)
      .json({ message: `Username ${username} already exists` });
  // userRepository.insertUser({ username, password });
  const id = randomUUID();
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
  users.push({ username, password:hashedPassword, id, role: 'client' });
  res.json({ username, id });
};

const getClients = (req, res) => {
  res.json(users)
};

export { login, validateSession, signUp, logoutUser,getClients, users };
