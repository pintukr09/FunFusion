import { useEffect } from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainContainer from "./MainContainer";
import MovieContainer from "./MovieContainer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import SearchMovie from "./SearchMovie";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import useHeartbeat from "../hooks/useHeartbeat";

const Browse = () => {
  const user = useSelector((store) => store.app.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggle = useSelector((store) => store.movie.toggle);

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  useHeartbeat(user?.email);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://funfusion-kno5.onrender.com/api/user/me", {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setUser(res.data.user));
        } else {
          navigate("/");
        }
      } catch (err) {
        navigate("/");
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [user, navigate, dispatch]);

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
        {toggle ? (
          <SearchMovie />
        ) : (
          <div className="flex flex-col space-y-6 md:space-y-8">
            <MainContainer />
            <MovieContainer />
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;