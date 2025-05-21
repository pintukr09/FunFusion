// middlewares/isAuthenticated.js
import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token; // Get token from cookie

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "dfbvdkjzfnvkjzdnfvkzdnjf"); // Verify token with the same secret
    req.user = decoded; // Attach decoded user data (e.g., { id: user._id }) to req.user
    return next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};