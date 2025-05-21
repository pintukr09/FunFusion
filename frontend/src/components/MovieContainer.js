import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const MovieContainer = () => {
  const movie = useSelector((store) => store.movie);
  return (
    <div className="bg-black mt-48">
      <div className="-mt-[160px] sm:-mt-[250px] md:-mt-[300px] relative z-10 px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
        <MovieList title={"Now Playing Movies"} movies={movie.nowPlayingMovies} />
        <MovieList title={"Popular Movies"} movies={movie.popularMovie} />
        <MovieList title={"Top Rated Movies"} movies={movie.topRatedMovies} />
        <MovieList title={"Upcoming Movies"} movies={movie.upcomingMovies} />
      </div>
    </div>
  );
};

export default MovieContainer;