import express, { Router } from "express";
import cors from "cors";

const initApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());


  app.get("/", (req, res) => {
    res.send("Home route working!");
  });

  // Test POST route
  app.post("/test", (req, res) => {
    res.json({ message: "POST received", body: req.body });
  });

  // Mount user routes (empty for now)
  const userRoutes = require("./routes/userRoutes").default || require("./routes/userRoutes");
  app.use("/api/users", userRoutes);

  return app;
};

export default initApp;
