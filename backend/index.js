import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import path from "path";

import databaseConnection from "./utils/database.js";
import userRoutes from "./routes/userRoute.js";
import authRoutes from "./routes/auth.js";
import { User } from "./models/userModel.js";
import router from "./routes/session.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const _dirname = path.resolve();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// CORS
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

// Passport setup (no session)
app.use(passport.initialize());

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = await User.create({
        fullName: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id,
      });
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

// Mount Routes
app.use("/api/user", userRoutes);
app.use("/auth/", authRoutes);
app.use("/api/session", router);

app.use(express.static(path.join(_dirname, "/frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "build", "index.html"));
})

// Connect DB & start server
databaseConnection();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});