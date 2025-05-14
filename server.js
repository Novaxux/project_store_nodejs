import express from "express";
import morgan from "morgan";
import { PORT, IP } from "./config/config.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(authRoutes);

app.listen(PORT, IP, () => {
  console.log(`server on http://${IP}:${PORT}`);
});
