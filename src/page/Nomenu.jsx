import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowCircleLeftSharpIcon from "@mui/icons-material/ArrowCircleLeftSharp";

const Nomenu = ({ url }) => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="contained"
        startIcon={<ArrowCircleLeftSharpIcon />}
        sx={{
          position: " absolute",
          top: "5%",
          zIndex: "1000",
          left: "3%",
          background: 'rgba(0, 0, 0, 0.87)'
        }}
        onClick={() => {
          navigate(`../`);
        }}
      >
        Back
      </Button>
      <iframe
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          border: "0px",
          backgroundColor: "black",
          position: " absolute",
          zIndex: "100",
        }}
        src={url}
      />
    </>
  );
};

export default Nomenu;
