import express from 'express';
import morgan from 'morgan';
import { PORT, IP, CORS_ORIGIN } from './config/config.js';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';
import CookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan('dev'));
app.use(CookieParser());
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/order', orderRoutes);

app.listen(PORT, IP, () => {
  console.log(`server on http://${IP}:${PORT}`);
});
