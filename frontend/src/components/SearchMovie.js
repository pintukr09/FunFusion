import React, { useState } from "react";
import axios from "axios";
import { SEARCH_MOVIE_URL, options } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSearchMovieDetails } from "../redux/searchSlice";
import { setLoading } from "../redux/userSlice";
import MovieList from "./MovieList";

const SearchMovie = () => {
  const [searchMovie, setSearchMovie] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.app.isLoading);
  const { movieName, searchedMovie } = useSelector(
    (store) => store.searchMovie
  );

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!searchMovie.trim()) return;
    dispatch(setLoading(true));
    try {
      const res = await axios.get(
        `${SEARCH_MOVIE_URL}${searchMovie}&include_adult=false&language=en-US&page=1`,
        options
      );
      const movies = res?.data?.results;
      dispatch(setSearchMovieDetails({ searchMovie, movies }));
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      dispatch(setLoading(false));
    }
    setSearchMovie("");
  };

  return (
    <div className="h-screen w-full bg-gray-100 flex flex-col items-center justify-start overflow-hiddenmt-7 mt-7" >
      <form
        onSubmit={submitHandler}
        className="w-full max-w-[90%] sm:max-w-[70%] md:max-w-[50%] lg:max-w-[40%] mt-6"
      >
        <div className="flex flex-col sm:flex-row items-stretch shadow-md border-2 border-gray-200 rounded-lg p-3 bg-white gap-2">
          <input
            value={searchMovie}
            onChange={(e) => setSearchMovie(e.target.value)}
            className="w-full outline-none text-base rounded-md px-3 py-2 border border-gray-300 focus:border-red-400 focus:ring-2 focus:ring-red-200"
            type="text"
            placeholder="Search Movies..."
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-red-800 text-white px-4 py-2 rounded-md font-semibold transition hover:bg-red-700"
          >
            {isLoading ? "Loading..." : "Search"}
          </button>
        </div>
      </form>

      {searchedMovie ? (
        <div className="w-full mt-6 sm:mt-8 md:mt-10 px-2">
          <MovieList
            title={movieName}
            searchMovie={true}
            movies={searchedMovie}
          />
        </div>
      ) : (
        <p className="text-gray-600 text-center text-sm sm:text-base mt-6">
          Search for a movie to see results
        </p>
      )}
    </div>
  );
};

export default SearchMovie;
