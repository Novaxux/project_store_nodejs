import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/config.js';

export const verifySession = (req, res, next) => {
  req.session = { user: null };
  try {
    const token = req.get('Authorization').split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.session.user = decoded;
  } catch {
    return res.status(401).send();
  }
  next();
};
