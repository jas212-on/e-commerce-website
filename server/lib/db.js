import mongoose from "mongoose";
import { seedData } from "../seeds/products.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    await seedData()
  } catch (error) {
    process.exit(1);
  }
};
