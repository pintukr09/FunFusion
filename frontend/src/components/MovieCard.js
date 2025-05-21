import React from "react";
import { TMDB_IMG_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { getId, setOpen } from "../redux/movieSlice";
import { Box, Typography } from "@mui/material";

const MovieCard = ({ posterPath, movieId, title, overview }) => {
  const dispatch = useDispatch();

  if (posterPath === null) return null;

  const handleOpen = () => {
    dispatch(getId(movieId));
    dispatch(setOpen(true));
    // Note: VideoTitle cannot be called as a function. It should be rendered as a component.
    // If VideoTitle needs to be displayed, it should be handled in the parent component or via state.
  };

  return (
    <Box
      className="movie-card flex-shrink-0"
      sx={{
        width: { xs: "120px", sm: "150px", md: "180px", lg: "200px" },
        height: { xs: "180px", sm: "225px", md: "270px", lg: "300px" },
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: { xs: "0 2px 8px rgba(0,0,0,0.2)", sm: "0 4px 12px rgba(0,0,0,0.2)" },
        "&:hover": {
          transform: { sm: "scale(1.05)" }, // Disable hover transform on mobile
          boxShadow: { sm: "0 8px 20px rgba(0,0,0,0.3)" },
        },
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
      onClick={handleOpen}
    >
      <img
        src={`${TMDB_IMG_URL}/${posterPath}`}
        alt="movie-banner"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "12px",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: { xs: "6px", sm: "8px", md: "10px" },
          background: "rgba(0, 0, 0, 0.6)",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          color: "white",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default MovieCard;