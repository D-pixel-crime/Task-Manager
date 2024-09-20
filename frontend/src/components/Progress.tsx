import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";

interface props {
  value: number;
  color?: string;
}

function CircularProgressWithLabel({ color, value }: props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        sx={{ color: `${color}` }}
        size={250}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: "text.secondary", fontSize: "2rem" }}
        >{`${Math.round(value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function Progress({ value, color }: props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress === value) return;
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= value ? value : prevProgress + 3.5
      );
    }, 100);

    if (progress === value) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [progress, value]);
  return <CircularProgressWithLabel value={progress} color={color} />;
}
