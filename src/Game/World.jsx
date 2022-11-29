import React, { useLayoutEffect, useState, useEffect  } from "react";
import _uniqueId from "lodash/uniqueId";

import { usePreload, useWindowSize } from "lingo3d-react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  useMediaQuery,
  styled,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import CircularStatic from "../component/CircularProgressWithLabel";
import ResponsiveDrawer from "../component/Drawer";
import Form from "../component/Form";
import Game from "./Game";
import { Html } from "@mui/icons-material";

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            // position: "absolute",
            // right: 8,
            // top: 8,
            // color: (theme) => theme.palette.grey[500],

            position: "absolute",
            right: 20,
            top: 10,
            color: "#FFC000",
            fontSize: "300px",
          }}
        >
          <CloseIcon sx={{ fontSize: "10%" }} />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const World = () => {
  const [isGame, setGame] = useState(false);
  const [open, setOpen] = useState(false);

  const [startAnimate, setAnimate] = useState(false);

  const windowSize = useWindowSize();
  const matches = useMediaQuery("(max-width:599px)");
  const isInital = sessionStorage.getItem("inital");

  const progress = usePreload(
    [
      `maps/tunnel1.glb`,
      `3dCharacter/new/character.glb`,
      `3dCharacter/new/BreathingIdle.fbx`,
      `3dCharacter/new/Running.fbx`,
    ],
    "50kb"
  );

  const handleGame = () => {
    setGame(true);
    isInital == null && sessionStorage.setItem("inital", true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      // console.log('This will run after 5 second!')
      setAnimate(true);

    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (progress < 100)
  // if the game is still loading
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          textAlign: "center",
          backgroundColor: "black",
          color: "white",
          width: "100vw",
        }}
      >
        <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
          <img
            alt="metasg"
            width={"100%"}
            height={"100%"}
            src={`preloader/preloader.gif`}
          />
          <CircularStatic value={progress} />
        </Stack>
      </div>
    );

  //if finish loading
  return (
    <>
      {isInital == null && (
        <Button
          onClick={() => {
            handleGame();
            setOpen(true);
            // setAnimate(true);
          }}
          sx={{
            background: `url( ${
              windowSize.width < 700
                ? "preloader/popMobile.png"
                : "preloader/popDesktop.png"
            })`,
            width: "100%",
            height: "100vh",
            border: "0px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundColor: "black",
            zIndex: 10000,
            color: "black",
            display: isGame ? "none" : "block",
          }}
        />
      )}

      <Slide
        direction="down"
        in={startAnimate}
        // style={{ transformOrigin: "0 0 0" }}
        // {...(startAnimate ? { timeout: 1000 } : {})}
        mountOnEnter
        unmountOnExit
      >
        <Button
          className="button-glow"
          variant="contained"
          sx={{
            top: `calc(100vh - ${matches ? "90vh" : "95vh"})`,
            border: "2px solid #c4a300 !important",
            backgroundColor: "rgb(0 0 0 / 80%)",
            position: "relative",
            zIndex: "1000",
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
            position: "fixed",
            bottom: "5vh",
            right:" 4vh",
            border: "2px solid #00ee28 !important",
            backgroundColor: "rgb(0 0 0 / 80%)",
            zIndex: "1000",
          }}
          onClick={() => {
            
            window.open('https://api.whatsapp.com/send?phone=6593722626&text=ismartwebsite', '_blank');
          }}
        >
          WHATSAPP
        </Button>

      <Dialog
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            background: "black",
            border: "2px solid #FFC000",
            color: "white",
            width: "-webkit-fill-available",
            borderRadius: "50px",
          },
        }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        />

        <DialogContent>
          <Form />
        </DialogContent>
      </Dialog>

      <ResponsiveDrawer />
      
      <Game />
    </>
  );
};

export default World;
