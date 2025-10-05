import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import requestRoutes from "./routes/requestRoutes";
import activityRoutes from "./routes/activityRoutes";
import authRoutes from "./routes/authRoutes";
import { errorHandler, notFound } from "./middleware/error.middleware";

const initApp = () => {
  const app = express();

  // Middleware
  app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get("/", (req, res) => {
    res.json({
      message: "DevCircle API is running!",
      version: "1.0.0",
      endpoints: {
        auth: "/api/auth",
        users: "/api/users",
        requests: "/api/requests",
        activities: "/api/activities",
      },
    });
  });

  // API Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/requests", requestRoutes);
  app.use("/api/activities", activityRoutes);

  // Error handling
  app.use(notFound);
  app.use(errorHandler);

  return app;
};

export default initApp;
