import { useEffect } from "react";
import axios from "axios";

const useHeartbeat = (email) => {
  useEffect(() => {
    if (!email) return;

    const interval = setInterval(async () => {
      try {
        await axios.post("http://localhost:5000/api/session/ping", {}, {
          withCredentials: true // Send cookies with request
        });
      } catch (err) {
        console.error("Ping error", err);
      }
    }, 5000); // Ping every 5 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [email]);
};

export default useHeartbeat;