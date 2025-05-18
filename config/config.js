import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const IP = process.env.IP;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

export { PORT, IP, JWT_SECRET_KEY, SALT_ROUNDS };
