import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(cors());

app.get("/hellos", (req, res) => {
  res.json({ message: "Hello from Hello Service 🚀" });
});

app.listen(PORT, () => {
  console.log(`✅ Server started at http://localhost:${PORT}`);
});
