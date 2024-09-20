import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

interface props {
  value: number; // Percentage value for the progress indicator
  color?: string; // Optional color for the progress bar
}

function CircularProgressWithLabel({ color, value }: props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      {/* CircularProgress component that shows a circular progress bar */}
      <CircularProgress
        variant="determinate" // Determines progress based on a value
        value={value} // Value of progress to be displayed
        sx={{ color: `${color}` }} // Optional color for the progress bar
        size={250} // Diameter of the progress circle
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute", // Center the percentage label within the circle
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Typography component to show the percentage inside the circle */}
        <Typography
          variant="caption"
          component="div"
          sx={{ color: "text.secondary", fontSize: "2rem" }} // Font size and color for the percentage
        >
          {`${Math.round(value)}%`} {/* Display progress value as percentage */}
        </Typography>
      </Box>
    </Box>
  );
}

export default function Progress({ value, color }: props) {
  // State to track the progress value that is animated
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress === value) return; // If the progress has reached the target value, do nothing

    // Timer to gradually increase the progress value by 3.5 every 100ms
    const timer = setInterval(() => {
      setProgress(
        (prevProgress) => (prevProgress >= value ? value : prevProgress + 3.5) // Stop at the target value
      );
    }, 100);

    // Clear the interval when the component unmounts or progress reaches the value
    return () => {
      clearInterval(timer);
    };
  }, [progress, value]); // Re-run effect if progress or value changes

  // Render the circular progress with animated value
  return <CircularProgressWithLabel value={progress} color={color} />;
}
