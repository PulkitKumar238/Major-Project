import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import publicEventRoutes from "./routes/publicEventRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(cors({
    origin: ["http://localhost:3001", "http://localhost:3000"],
    credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/public/events", publicEventRoutes);
app.use("/api/users", userRoutes);

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