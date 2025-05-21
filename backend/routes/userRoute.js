import express from "express";
import {
  Register as register,
  Login as login,
  Logout as logout,
  ForgotPassword as forgot_password,
  ResetPassword as reset_password
} from "../controllers/usermModel.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/forgot_password", forgot_password);
router.post("/reset_password/:token", reset_password);

// Check if the user is logged in (after Google or normal login)
router.get("/me", isAuthenticated, (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
});

// Browse route (protected)
router.get("/browse", isAuthenticated, (req, res) => {
  return res.status(200).json({ success: true, message: "Welcome to the browse page!" });
});

export default router;