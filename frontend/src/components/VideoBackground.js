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
        className={`${bool ? "w-[100%]" : "w-screen aspect-video"} `}
        src={`https://www.youtube.com/embed/${trailerMovie?.key}?si=HorxQfzFY2_TAO1W&autoplay=1&mute=1`}
        title="Movie Trailer"
        frameBorder="0"
   
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

