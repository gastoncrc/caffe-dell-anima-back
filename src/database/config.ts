import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUrl: string = process.env.DB_URL as string;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to the DB");
  } catch (err) {
    console.error("Failed to connect to the DB", err);
  }
};

export default connectDB;
