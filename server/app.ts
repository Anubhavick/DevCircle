import cors from "cors";
import express from "express";




const initApp = () => {
  try {
    const app = express();

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Routes


    return app;
  } catch (err) {
    console.log("App initialization error:", err);
    throw err;
  }
};

export default initApp;