import express from "express";
import morgan from "morgan";
import { PORT, IP, JWT_SECRET_KEY } from "./config/config.js";
import jwt from "jsonwebtoken";
import { verifySession } from "./middleware/verifySession.js";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

let users = [{ username: "Manuel", password: "12345" }];

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const found = users.find(
    (element) => element.username == username && element.password == password
  );
  if (!found) return res.status(400).send();
  const token = jwt.sign({ username, password }, JWT_SECRET_KEY, {
    expiresIn: "1hr",
  });
  res.json({ token });
});

app.get("/protected", verifySession, (req, res) => {
  const { user } = req.session;
  res.json({ user });
});

app.listen(PORT, IP, () => {
  console.log(`server on http://${IP}:${PORT}`);
});
