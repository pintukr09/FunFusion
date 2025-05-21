import React, { useRef, useEffect } from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies, searchMovie = false }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener('wheel', handleWheel, { passive: false });

    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6">
      <h1
        className={`${
          searchMovie ? "text-black" : "text-white"
        } text-xl sm:text-2xl md:text-3xl font-bold`}
      >
        {title}
      </h1>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto no-scrollbar cursor-pointer mt-2 sm:mt-3 md:mt-4"
      >
        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
          {movies?.map((movie) => (
            <MovieCard
              key={movie.id}
              movieId={movie.id}
              posterPath={movie.poster_path}
              movieTitle={movie.title}
              movieOverview={movie.overview}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;