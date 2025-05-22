import React from "react";
import { VscAccount } from "react-icons/vsc";
import { setToggle } from "../redux/movieSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { API_END_POINT } from "../utils/constant";
import { setUser } from "../redux/userSlice";

const Header = () => {
  const user = useSelector((store) => store.app.user);
  const dispatch = useDispatch();
  const toggle = useSelector((store) => store.movie.toggle);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(null));
        navigate("/");
      }
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const toggleHandler = () => {
    dispatch(setToggle());
  };

    return (
    <div className="absolute z-10 w-full flex flex-wrap items-center justify-between px-1 py-3 bg-gradient-to-b from-white gap-2 sm:gap-4 md:flex-row ">
      {/* Logo */}
      <div className=" text-base sm:text-2xl md:text-3xl lg:text-3xl font-black tracking-wide bg-gradient-to-r from-red-500 via-yellow-400 to-purple-600 text-transparent bg-clip-text animate-gradient glow-hover transition-transform  ">
        FunFusion
      </div>

      {user && (
        <div className="flex items-center justify-end flex-wrap gap-2 sm:gap-3 max-w-full">
          {/* User Info */}
          <div className="flex items-center gap-1">
             <VscAccount
      className="text-orange-500 
                 w-5 h-5         // default (mobile)
                 sm:w-6 sm:h-6   // small screens ≥ 640px
                 md:w-7 md:h-7   // medium screens ≥ 768px
                 lg:w-8 lg:h-8"  // large screens ≥ 1024px
    />
            <span className="text-sm  sm:text-sm  md:text-base  lg:text-xl font-medium truncate max-w-[100px] sm:max-w-[150px]">{user.fullName}</span>
          </div>

          {/* Buttons */}
          <button
            onClick={logoutHandler}
            className="bg-red-600 text-black px-3 py-1 text-xs sm:text-sm  md:text-base  lg:text-lg border border-red-400 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
          <button
            onClick={toggleHandler}
            className="bg-purple-700 text-white px-3 py-1 text-xs sm:text-sm  md:text-base  lg:text-lg   border border-purple-400 rounded hover:bg-purple-800 transition"
          >
            {toggle ? "Home" : "Search"}
          </button>
        </div>
      )}
    </div>
  );

};

export default Header;
