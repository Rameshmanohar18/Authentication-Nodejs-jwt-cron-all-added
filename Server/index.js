import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import connectDB from "./config/dbConnect.js";
``
connectDB();


import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";

import error from "./middleware/errorMiddleware.js";

const app=express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/profile",profileRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/sessions",sessionRoutes);

app.use(error);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
