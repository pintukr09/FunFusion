import React, { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import { API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/userSlice";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isLoading = useSelector((store) => store.app.isLoading);

  // Check for error query parameter on mount
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const error = queryParams.get("error");
    if (error) {
      toast.error(decodeURIComponent(error));
      navigate("/login", { replace: true });
    }
  }, [location, navigate]);

  const loginHandler = () => {
    setIsLogin(!isLogin);
  };

  const getInputData = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    if (isLogin) {
      const user = { email, password };
      try {
        const res = await axios.post(`${API_END_POINT}/login`, user, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        if (res.data.success) {
          toast.success(res.data.message);
          dispatch(setUser(res.data.user));
          navigate("/browse");
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Login failed");
      } finally {
        dispatch(setLoading(false));
      }
    } else {
      const user = { fullName, email, password };
      try {
        const res = await axios.post(`${API_END_POINT}/register`, user, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        if (res.data.success) {
          toast.success(res.data.message);
          setIsLogin(true);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Signup failed");
      } finally {
        dispatch(setLoading(false));
      }
    }

    setFullName("");
    setEmail("");
    setPassword("");
  };

  const handleForgotPassword = () => {
    navigate("/forgot_password");
  };

  const handleGoogleRedirect = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="w-[100vw] h-[100vh] bg-cover object-cover"
          src="https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc3/netflixteaser.png"
          alt="banner"
        />
      </div>

      <form
        onSubmit={getInputData}
        className="flex flex-col w-[90%] sm:w-3/4 md:w-2/4 lg:w-1/3 xl:w-1/4 p-6 mt-20 mx-auto items-center justify-center absolute left-0 right-0 rounded-xl bg-black bg-opacity-80 backdrop-blur-md"
      >
        <h1 className="text-3xl text-white mb-5 mt-1 font-bold">
          {isLogin ? "Login" : "Signup"}
        </h1>

        <div className="flex flex-col w-full">
          {!isLogin && (
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              placeholder="Full Name"
              className="p-3 my-2 rounded-xl bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-red-500 outline-none transition duration-200"
              disabled={isLoading}
            />
          )}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="p-3 my-2 rounded-xl bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-red-500 outline-none transition duration-200"
            disabled={isLoading}
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="p-3 my-2 rounded-xl bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-red-500 outline-none transition duration-200"
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`mt-6 p-3 text-white rounded-full font-semibold transition duration-300 ${isLoading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 shadow-md hover:shadow-lg"
              }`}
          >
            {isLoading ? "Please wait..." : isLogin ? "Login" : "Signup"}
          </button>

          {isLogin && (
            <button
              type="button"
              onClick={handleGoogleRedirect}
              className="mt-4 flex items-center justify-center p-3 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-gray-100 transition"
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
                className="w-5 h-5 mr-2"
              />
              Sign in with Google
            </button>
          )}

          {isLogin && (
            <button
              type="button"
              onClick={handleForgotPassword}
              className="mt-4 px-3 py-2 text-sm font-semibold text-white bg-purple-500 rounded-full hover:bg-purple-600 transition duration-200 shadow-md"
            >
              Forgot Password?
            </button>
          )}

          <p className="text-white text-md pt-5 text-center">
            {isLogin ? "New to FunFusion?" : "Already have an account?"}
            <button
              onClick={loginHandler}
              type="button"
              className="ml-2 px-3 py-1 text-sm bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition duration-300 shadow-sm"
            >
              {isLogin ? "Signup" : "Login"}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;