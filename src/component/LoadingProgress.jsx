import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { Typography, useMediaQuery } from "@mui/material";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          sx={{ color: "rgb(255 255 255 / 80%)" }}
        >{`${Math.round(props?.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function LinearDeterminate({ value }) {
  const [progress, setProgress] = React.useState(0);
  const mobileVersion = useMediaQuery("(max-width:425px)");

  return (
    <Box
      backgroundColor="#000"
      color="#111"
      fontFamily="Baloo Thambi, cursive"
      fontSize={mobileVersion ? "2em" : "7rem"}
    >
      <div className="text-container">
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
      </div>
      <LinearProgressWithLabel variant="determinate" value={value} />
    </Box>
  );
}
