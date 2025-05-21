import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./components/Login";
import Browse from "./components/Browse";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword"; // Import the new component
import MovieDialog from "./components/MovieDialog";

function App() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      navigator.sendBeacon(
        "https://funfusion-kno5.onrender.com/auth/logout",
        new Blob([], { type: "application/json" })
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <GoogleOAuthProvider clientId="376233160785-o3pv97ai8u0nq2i6q6mvh4nu5g6dcl4b.apps.googleusercontent.com">
      <Router>
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route path="/reset_password/:token" element={<ResetPassword />} /> {/* Added route */}
            <Route path="/" element={<Login />} />
          </Routes>
          <Toaster />
          <MovieDialog />
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;