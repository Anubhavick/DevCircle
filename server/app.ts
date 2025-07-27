import express, { Router } from "express";
import cors from "cors";

const initApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => {
  res.send("Home route working!");
});

  return app;
};

export default initApp;
