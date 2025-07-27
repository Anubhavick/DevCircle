import mongoose from "mongoose";

const initDB = async () => {
  try {
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
    // if (!uri) {
    //   throw new Error("MONGO_URI is not set in environment variables.");
    // }
    await mongoose.connect(uri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Database connection failed : ", error);
    process.exit(1);
  }
};

export default initDB;
