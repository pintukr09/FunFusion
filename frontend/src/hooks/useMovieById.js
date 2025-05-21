import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTrailerMovie } from "../redux/movieSlice";
import { options } from "../utils/constant";

const useMovieById = (movieId) => {
  const dispatch = useDispatch();
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovieById = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          options
        );

        const trailers = res?.data?.results?.filter((item) => item.type === "Trailer");
        const selected = trailers.length > 0 ? trailers[0] : res.data.results[0];

        dispatch(getTrailerMovie(selected));
        setTrailer(selected);
      } catch (error) {
        console.error("Failed to fetch movie trailer:", error);
        setTrailer(null);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) getMovieById();
  }, [dispatch, movieId]);

  return { trailer, loading };
};

export default useMovieById;
