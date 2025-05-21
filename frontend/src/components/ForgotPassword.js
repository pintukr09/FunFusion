import { useState } from "react";
import axios from "axios";
import { API_END_POINT } from "../utils/constant";
import Header from "./Header";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_END_POINT}/forgot_password`, { email });
      setMessage("Reset link has been sent.");
      setShowPopup(true);
    } catch (err) {
      setMessage("Something went wrong. Try again.");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

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
        onSubmit={handleSubmit}
        className="flex flex-col w-[90%] sm:w-3/4 md:w-2/4 lg:w-1/3 xl:w-1/4 p-6 mt-20 mx-auto items-center justify-center absolute left-0 right-0 rounded-xl bg-black bg-opacity-80 backdrop-blur-md"
      >
        <h1 className="text-3xl text-white mb-5 font-bold">Forgot Password</h1>

        <input
          type="email"
          placeholder="Enter Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="outline-none p-3 my-2 rounded-full bg-gray-800 text-white w-full border border-gray-600 focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition-all duration-200"
        />

        <button
          type="submit"
          className="mt-4 p-3 text-white bg-blue-800 rounded-full hover:bg-red-700 transition-all duration-300 w-full font-semibold"
        >
          Send Reset Link
        </button>
      </form>


      {/* Popup modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <div className="flex flex-col items-center">
              <div className="mb-4 text-green-500 text-5xl">✓</div>
              <h3 className="text-xl font-medium text-white mb-2">Success!</h3>
              <p className="text-gray-300 text-center mb-6">{message}</p>
              <button
                onClick={closePopup}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default ForgotPassword;