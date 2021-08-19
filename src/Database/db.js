import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const db = process.env.DB_CONNECTION_STRING;

export const dbConnection = {
  getConnect: async () => {
    try {
      await mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      });

      // On success
      console.log("Database connected successfully");
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  },
};
