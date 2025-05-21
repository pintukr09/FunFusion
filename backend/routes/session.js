import express from "express";
import { Session } from "../models/sessionModel.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware to verify JWT
const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, "dfbvdkjzfnvkjzdnfvkzdnjf");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Authenticated ping route
router.post("/ping", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;

    const session = await Session.findOne({ userId });
    if (!session) {
      return res.status(404).json({ message: "Session not found", success: false });
    }

    session.lastPing = new Date();
    await session.save();

    res.status(200).json({ message: "Ping received", success: true });
  } catch (error) {
    console.error("Ping error:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
});

export default router;