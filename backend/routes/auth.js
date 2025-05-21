import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { Session } from "../models/sessionModel.js";
import { Logout } from "../controllers/usermModel.js";

const router = express.Router();

// Start Google OAuth flow
router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

// Handle Google OAuth callback
router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", async (err, user) => {
    if (err || !user) {
      return res.redirect("https://funfusion-kno5.onrender.com/login?error=Google%20authentication%20failed");
    }

    try {
      // Check for active session
      const session = await Session.findOne({ userId: user._id });
      const now = new Date();
      if (session && (now - new Date(session.lastPing)) < 30000) {
        // Redirect to login with error message in query parameter
        return res.redirect(
          "https://funfusion-kno5.onrender.com/login?error=User%20already%20logged%20in%20on%20another%20device.%20Please%20log%20out%20first."
        );
      }

      // Create new session (delete old one if it exists)
      if (session) {
        await Session.deleteOne({ userId: user._id });
      }
      await Session.create({ userId: user._id, lastPing: now });

      // Generate JWT
      const tokenData = { id: user._id };
      const token = jwt.sign(tokenData, "dfbvdkjzfnvkjzdnfvkzdnjf", { expiresIn: "1h" });

      // Set cookie and redirect
      res.cookie("token", token, { httpOnly: true });
      res.redirect("https://funfusion-kno5.onrender.com/browse");
    } catch (error) {
      res.redirect("https://funfusion-kno5.onrender.com/login?error=An%20error%20occurred%20during%20Google%20login");
    }
  })(req, res, next);
});

// Logout route (support both GET and POST for sendBeacon)
router.all("/logout", Logout);

export default router;