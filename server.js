import express from 'express';
import morgan from 'morgan';
import { PORT, IP } from './config/config.js';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/order', orderRoutes);

app.listen(PORT, IP, () => {
  console.log(`server on http://${IP}:${PORT}`);
});
