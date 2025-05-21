import { useState, useEffect, useRef, useCallback } from "react"; // Added useCallback
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_END_POINT } from "../utils/constant";
import Header from "./Header";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
  const closeButtonRef = useRef(null);

  // Wrap closePopup in useCallback to prevent unnecessary re-renders
  const closePopup = useCallback(() => {
    setShowPopup(false);
    if (message === "Password reset successful.") {
      navigate("/");
    }
  }, [message, navigate]); // Dependencies of closePopup

  const handleReset = async (e) => {
    e.preventDefault();
    if (!newPassword) {
      setMessage("Please enter a new password.");
      setShowPopup(true);
      return;
    }
    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      setShowPopup(true);
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(`${API_END_POINT}/reset_password/${token}`, {
        newPassword,
      });
      setMessage(res.data.message || "Password reset successful.");
      setShowPopup(true);
    } catch (err) {
      setMessage(err?.response?.data?.message || "Invalid or expired link.");
      setShowPopup(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Accessibility: Focus on close button when popup opens and handle Escape key
  useEffect(() => {
    if (showPopup && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && showPopup) {
        closePopup();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showPopup, closePopup]); // Added closePopup to dependencies

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="w-[100vw] h-[100vh] bg-cover"
          src="https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/netflixteaser.png"
          alt="banner"
        />
      </div>
      <form
        onSubmit={handleReset}
        className="flex flex-col w-[90%] sm:w-3/4 md:w-2/4 lg:w-1/3 xl:w-1/4 p-6 mt-20 mx-auto items-center justify-center absolute left-0 right-0 rounded-xl bg-black bg-opacity-80 backdrop-blur-md"
      >
        <h1 className="text-3xl text-white mb-5 font-bold">Reset Password</h1>

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="outline-none p-3 my-2 rounded-full bg-gray-800 text-white w-full border border-gray-600 focus:ring-2 focus:ring-red-500 placeholder-gray-400 transition-all duration-200"
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`mt-4 p-3 text-white rounded-full hover:bg-red-700 transition-all duration-300 w-full font-semibold ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500"
            }`}
        >
          {isLoading ? "Please wait..." : "Reset Password"}
        </button>
      </form>

      {/* Popup modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <div className="flex flex-col items-center">
              {message === "Password reset successful." ? (
                <div className="mb-4 text-green-500 text-5xl">✓</div>
              ) : (
                <div className="mb-4 text-green-600 text-5xl">✓</div>
              )}
              <h3 className="text-xl font-medium text-purple-600 mb-2">
                {message === "Password reset successful." ? "Success!" : "Success!"}
              </h3>
              <p className="text-gray-300 text-center mb-6">{message}</p>
              <div className="flex space-x-4">
                <button
                  ref={closeButtonRef}
                  onClick={closePopup}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  {message === "Password reset successful." ? "Go to Login" : "Close"}
                </button>
                {message !== "Password reset successful." && (
                  <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Go to Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;