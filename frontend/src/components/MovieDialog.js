import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useSelector, useDispatch } from "react-redux";
import { setOpen } from "../redux/movieSlice";
import VideoBackground from "./VideoBackground";

export default function MovieDialog() {
  const { open, id } = useSelector((store) => store.movie);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setOpen(false));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      fullWidth
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialog-paper": {
          width: { xs: "90vw", sm: "70vw", md: "50vw", lg: "40vw" },
          height: { xs: "60vh", sm: "65vh", md: "70vh" },
          backgroundColor: "black",
          overflow: "hidden",
          padding: 0,
          borderRadius: { xs: "12px", sm: "16px", md: "20px" },
          border: "2px solid transparent",
          backgroundImage: `
            linear-gradient(black, black),
            linear-gradient(135deg, #ff416c, #ff4b2b)
          `,
          backgroundOrigin: "border-box",
          backgroundClip: "content-box, border-box",
          boxShadow: {
            xs: "0 4px 12px rgba(255, 75, 43, 0.2)",
            sm: "0 8px 20px rgba(255, 75, 43, 0.3)",
          },
        },
      }}
    >
      <DialogContent sx={{ padding: 0, height: "100%" }}>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ height: "100%", padding: 0 }}
        >
          <VideoBackground movieId={id} bool={true} />
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          backgroundColor: "black",
          justifyContent: "center",
          pb: { xs: 1, sm: 2 },
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
            color: "white",
            fontWeight: "bold",
            px: { xs: 2, sm: 3 },
            py: { xs: 0.5, sm: 1 },
            fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
            borderRadius: "30px",
            boxShadow: {
              xs: "0 2px 6px rgba(0,0,0,0.3)",
              sm: "0 4px 10px rgba(0,0,0,0.4)",
            },
            transition: "all 0.3s ease",
            "&:hover": {
              transform: { sm: "scale(1.05)" }, // Disable scale on mobile
              boxShadow: {
                sm: "0 6px 14px rgba(0,0,0,0.6)",
              },
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}