import express from "express";
import morgan from "morgan";
import { PORT, IP, JWT_SECRET_KEY } from "./config/config.js";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

let users = [{ username: "Manuel", password: "12345" }];

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  //   UserRepository.select(username,password)
  const found = users.find(
    (element) => element.username == username && element.password == password
  );
  if (!found) return res.status(400).send();
  const token = jwt.sign({ username, password }, JWT_SECRET_KEY, {
    expiresIn: "1hr",
  });
  res.json({ token });
});
app.listen(PORT, IP, () => {
  console.log(`server on http://${IP}:${PORT}`);
});

app.get("/protected", (req, res) => {
    const token = req.get("Authorization").split(" ")[1];
    console.log(token)
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    return res.json(decoded);
  } catch {
    return res.status(401).send();
  }
});
