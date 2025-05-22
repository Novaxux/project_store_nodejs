import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/config.js';

export const verifySession = (req, res, next) => {
  req.session = { user: null };
  try {
    // const token = req.get('Authorization').split(' ')[1];
    const token = req.cookies.access_token;
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.session.user = decoded;
  } catch {
    return res.status(401).json({message: 'session not valid'});
  }
  next();
};

export const verifyAdmin = (req, res, next) => {
  const { role } = req.session.user;
  if (role !== 'admin') return res.status(401).send();
  next();
};
