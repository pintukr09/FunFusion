import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional for Google-auth users
  googleId: { type: String, default: null }, // Only for Google users
  resetToken: String,
  resetTokenExpiry: Date,
}, {
  timestamps: true,
});

export const User = mongoose.model("user", userSchema);