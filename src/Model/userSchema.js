import mongoose from "mongoose";
import validator from "validator";

const { isEmail } = validator;
const { Schema, model } = mongoose;

const userSchema = new Schema({
    sender: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [ true, "Please enter your email" ],
      validate: [ isEmail, "Please enter a valid email address" ],
      trim: true,
      unique: true,
      lowercase: true
    },
    message: [ String ],
  },
  { timestamps: true }
);

export const User = model("user", userSchema);