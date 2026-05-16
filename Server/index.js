import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";
import connectDB from "./config/dbConnect.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import error from "./middleware/errorMiddleware.js";
import limiter from "./config/rateLimit.js";

connectDB();

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({ success: true, message: "Server is healthy" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/sessions", sessionRoutes);

app.use(limiter);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(require("helmet")());
app.use(require("xss-clean")());
app.use(require("hpp")());

app.use(error);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
