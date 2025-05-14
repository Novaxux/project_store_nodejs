import { JWT_SECRET_KEY } from "../config/config.js";
import jwt from "jsonwebtoken";
import { randomUUID } from "node:crypto";

let users = [{ id: randomUUID(), username: "Manuel", password: "12345" }];
const login = (req, res) => {
  const { username, password } = req.body;
  const found = users.find(
    (u) => u.username == username && u.password == password
  );
  // userRepository.selectUser({username})
  if (!found) return res.status(400).send();
  const { password: _, ...userData } = found;
  const token = jwt.sign(userData, JWT_SECRET_KEY, {
    expiresIn: "1hr",
  });
  res.json({ token });
};

const validateSession = (req, res) => {
  const { user } = req.session;
  res.json({ valid: true, ...user });
};

const signUp = (req, res) => {
  const { username, password } = req.body;
  const userFound = users.find((u) => u.username === username);
  if (userFound) return res.status(400).send();
  // userRepository.insertUser({ username, password });
  const id = randomUUID();
  users.push({ username, password, id });
  res.json({ username, password, id });
};

export { login, validateSession, signUp };
