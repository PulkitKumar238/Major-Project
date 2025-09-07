import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(cors({
    origin: "*",
}));
app.use(morgan("dev"));
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});