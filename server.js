import cors from 'cors';
import path from "path";
import express from 'express';
import { dbConnection } from './src/Database/db.js';
import postController from './src/Controller/postController.js';

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Public"));

app.set("view engine", "ejs");
app.set("views", __dirname + "/src/Views");
app.set("view options", { layout: false });

dbConnection.getConnect();

app.get("/", (req, res) => {
  return res.render('index');
});
app.post("/", postController.sendMessage);

app.listen(PORT, () => console.log(`Server connected at http://localhost:${PORT}`));