import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  lastPing: { type: Date, default: Date.now },
});

export const Session = mongoose.model("Session", sessionSchema);