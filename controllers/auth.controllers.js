import { JWT_SECRET_KEY } from "../config/config.js";
import jwt from "jsonwebtoken";
import { randomUUID } from "node:crypto";

let users = [{ id: randomUUID(), username: "Manuel", password: "12345" }];
const login = (req, res) => {
  const { username, password } = req.body;
  const found = users.find(
    (element) => element.username == username && element.password == password
  );
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
};

export { login, validateSession };
