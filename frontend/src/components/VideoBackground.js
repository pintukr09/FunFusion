import React from "react";
import useMovieById from "../hooks/useMovieById";
import { useSelector } from "react-redux";

const VideoBackground = ({ movieId, bool }) => {
  const trailerMovie = useSelector((store) => store.movie.trailerMovie);
  const handleClick = () => {
    // VideoTitle({ title, overview })
  }

  useMovieById(movieId);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <iframe
        onClick={handleClick}
        className={`${bool ? "w-full h-full" : "w-screen aspect-video"} border-none`}
        src={`https://www.youtube.com/embed/${trailerMovie?.key}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1&loop=1&playlist=${trailerMovie?.key}`}
        title="Movie Trailer"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        style={{
          width: '100%',
          height: '100%',
        }}

      />
    </div>
  );
};

export default VideoBackground;

