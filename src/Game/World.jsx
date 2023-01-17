import React, { useState, useEffect } from "react";
import _uniqueId from "lodash/uniqueId";

import { usePreload, useWindowSize } from "lingo3d-react";

import {
  Button,
  Stack,
  useMediaQuery,
  Slide,
} from "@mui/material";

import LoadingProgress from "../component/LoadingProgress";
import Game from "./Game";
import ScrollDialog from "../component/ScrollDialog";
import ResponsiveDrawer from "../component/Drawer";

const World = () => {

  /* A react hook. */
  const [isGame, setGame] = useState(true);
  const [open, setOpen] = useState(false);
  const [startAnimate, setAnimate] = useState(false);

  const matches = useMediaQuery("(max-width:599px)");
  const isInital = sessionStorage.getItem("inital");

  isInital == null && sessionStorage.setItem("inital", false);

  /* A react hook that preload the assets. */
  const progress = usePreload(
    [
      "maps/tunnel/tunnel1.glb",
      "3dCharacter/new/character1.glb",
      "3dCharacter/new/character2.glb",
      "3dCharacter/new/character3.glb",
      "3dCharacter/new/BreathingIdle.fbx",
      "3dCharacter/new/Running.fbx",
    ],
    "0.10mb"
  );

  /**
   * When the user clicks the close button, the modal will close and the sessionStorage will be set to
   * true.
   */
  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem("inital", true);
  };

  /**
   * When the user clicks the "Start Game" button, the game starts and the camera is turned on.
   */
  const handleInstructionClose = () => {
    setGame(false);
    const buttonCamera = document.getElementById("cameraButton")
    buttonCamera.click()
  };


  /* A react hook that will set the state of `startAnimate` to true after 5 seconds. */
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  /* A loading screen. */
  if (progress < 100)

    /* A loading screen. */
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          textAlign: "center",
          backgroundColor: "transparent",
          color: "white",
          width: "100vw",
        }}
      >
        <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
          <LoadingProgress value={Math.floor(progress)} />
        </Stack>
      </div>
    );

  return (
    <>

      <ScrollDialog
        htmlFor="instruction"
        dataContent=""
        open={isGame}
        onClose={handleInstructionClose}
        handleClose={handleInstructionClose}
      />

      {isInital &&
        <ScrollDialog
          htmlFor="needHelp"
          dataContent=""
          open={open}
          onClose={handleClose}
          handleClose={handleClose}
        />
      }

      <Slide direction="down" in={startAnimate} mountOnEnter unmountOnExit>
        <Button
          className="button-glow"
          variant="contained"
          sx={{
            top: `calc(100vh - ${matches ? "90vh" : "95vh"})`,
            p: 2.5
          }}
          onClick={() => {
            setOpen(true);
          }}
        >
          Need help ?
        </Button>
      </Slide>

      <Button
        className="button-glow2"
        variant="contained"
        sx={{
          p: 2.5
        }}
        onClick={() => {
          window.open(
            "https://wasap.my/6585351972/Hi%20iSmart%20Support,%20I%20am%20coming%20from%20your%20website",
            "_blank"
          );
        }}
      >
        WHATSAPP
      </Button>

      {/* <ResponsiveDrawer /> */}

      <Game />

    </>
  );
};

export default World;
