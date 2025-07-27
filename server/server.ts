import * as dotenv from "dotenv";
dotenv.config();

import initApp from "./app";
import initDB from "./config/db.config";

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await initDB(); // dummy DB connection
    const app = initApp();

    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server start error:", err);
  }
};

startServer();
