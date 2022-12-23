import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import { Box, CircularProgress, ClickAwayListener, Stack, useTheme, styled, IconButton, Slide } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import CardFeed from "./CardFeed";
import AuthForm from "./UiUx/AuthForm";
import AvatarCard from "./UiUx/AvatarCard";
import Form from "./Form";
import InstructionCtx from "./UiUx/InstructionCtx";
import ListMenu from "./UiUx/listMenu";
import WelcomeButton from "./UiUx/WelcomeButton";

var menuData = [{ id: 1, name: 'Intrest form' }, { id: 2, name: 'share' }, { id: 3, name: 'help' }]

const loginButton = () => {
  const loginEl = document.getElementById("formButton")
  loginEl.click()
  loginEl.style.display = "block"
}

const registerButton = () => {
  const loginEl = document.getElementById("formButton")
  loginEl.click()
  loginEl.style.display = "block"
}


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide
    ref={ref}
    {...props}
    direction="up"
    mountOnEnter
    unmountOnExit
    in={props.in}
    style={{
      transformOrigin: "0 0 0",
      position: "relative",
      zIndex: "1000000",
    }}
    {...(true ? { timeout: 1000 } : {})}
  />;
});


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "-webkit-fill-available",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    backgroundColor: "transparent",
    overflow: "visible",
    boxShadow: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(1),
  },

  "& .MuiIconButton-root": {
    "&:hover": {
      backgroundColor: "#ff6565",
    },
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, handleClose, htmlFor, ...other } = props;
  const matches = useMediaQuery("(max-width:425px)");


  return (
    <DialogTitle sx={{ m: 0, p: 2, display: "flex", justifyContent: "flex-end", width: "100%" }} {...other}>
      {htmlFor != "welcome" && htmlFor != "instruction" && handleClose ? (
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            backgroundColor: "red",
            color: "white",
            top: " -5%",
            right: "-5%",
            // top: matches ? "-2%" : "-8%",
            // right: matches ? "-2%" : "-5%",
            borderRadius: "50%",
          }}
        >
          <CloseIcon sx={{ fontSize: matches ? "1em" : "1.5em" }} />
        </IconButton>
      ) : null
      }
    </DialogTitle >
  );
};

const AnimateBox = styled("div")({
  "@keyframes pulsate": {
    "0%": {
      backgroundPosition: "0% 50%"
    },
    "50%": {
      backgroundPosition: "100% 50%"
    },
    "100%": {
      backgroundPosition: "0% 50%"
    }
  },
  animation: "pulsate 4s ease infinite",
  background: "linear-gradient(270deg, #833ab4, #fd1d1d, #fcb045)",
  backgroundSize: "600% 600%",
  // background: "linear-gradient(300deg,#ffe800,#000000,#ff8800)",
  // backgroundSize: "120% 120%",
  padding: "0.8rem",
  borderRadius: "40px",
  width: "inherit",
  maxWidth: "600px",
});

export default function ScrollDialog({
  htmlFor,
  boothState,
  dataContent,
  open,
  handleClose,
}) {
  const [scroll, setScroll] = React.useState("paper");
  const [isAvatar, setAvatarButton] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [isSuccess, setSuccess] = React.useState(false);
  const [isReady, setReady] = React.useState(false)

  const matches = useMediaQuery("(max-width:425px)");

  const isLogin = sessionStorage.getItem("login");

  const handleAvatar = () => {


    setLoading(true)

    setTimeout(() => {

      setLoading(false)
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        setAvatarButton(false)
        isLogin == false ? handleClose("avatarClose") : handleClose()

      }, 500)


    }, 1000);
  }

  const handleInst = () => {
    handleClose("instructionClose")
  }

  const handleReady = () => {
    setReady(true)
  }

  return (
    <>
      <BootstrapDialog
        TransitionComponent={Transition}
        fullScreen
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        className={(htmlFor == "welcome" || htmlFor == "avatar" || htmlFor == "login" || htmlFor == "register") && "imgBcg"}
        sx={{
          backgroundColor: "transparent",
          backgroundSize: "cover",
          backgroundImage: (htmlFor == "welcome" || htmlFor == "avatar" || htmlFor == "login" || htmlFor == "register") && `url(img/sky/cover3.JPG)`,
        }}
      >
        <ClickAwayListener disableReactTree onClickAway={htmlFor != "welcome" && htmlFor != "instruction" ? handleClose : false}>
          <AnimateBox>
            <Stack
              sx={{
                p: 1,
                flexWwrap: "wrap",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                color: "white",
                position: " relative",
                zIndex: 1,
                border: "2px solid black",
                backgroundColor: "black",
                borderRadius: "30px",
              }}
            >

              <BootstrapDialogTitle
                component="div"
                id="customized-dialog-title"
                handleClose={handleClose}
                htmlFor={htmlFor}
              />

              <DialogContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  flexDirection: "column",
                  pb: 0,
                  overflow: "visible"
                }}
                dividers={scroll === "paper"}
              >

                <Typography variant={matches ? "h5" : "h4"} id="titleDialog">
                  {htmlFor == "needHelp" && <>How can we <span style={{ color: 'red' }}> HELP  </span> you ?</>}
                  {htmlFor == "welcome" && "WELCOME"}
                  {htmlFor == "instruction" && "INSTRUCTION"}
                  {htmlFor == "login" && "LOGIN"}
                  {htmlFor == "register" && "REGISTER"}
                  {htmlFor == "menu" && "MENU"}
                  {htmlFor == "avatar" && "CHOOSE AVATAR"}
                  {htmlFor == "Info Board" && "INFO BOARD"}
                </Typography>

                <Slide
                  direction="up"
                  in={true}
                  style={{
                    transformOrigin: "0 0 0",
                    position: "relative",
                    zIndex: "1000000",
                  }}
                  {...(true ? { timeout: 1000 } : {})}
                >

                  <Box
                    sx={{
                      mt: 2,
                      width: "100%",
                      height: htmlFor == "needHelp" && matches && "50vh",
                      overflow: htmlFor == "needHelp" && matches && "auto",
                      display: htmlFor == "menu" && "flex",
                      justifyContent: htmlFor == "menu" && "center",

                      '&::-webkit-scrollbar': {
                        width: '0.3em',
                      },
                      '&::-webkit-scrollbar-track': {
                        background: "#f1f1f1",
                        borderRadius: "50px",
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#888',
                        borderRadius: "50px",
                      },
                      '&::-webkit-scrollbar-thumb:hover': {
                        background: '#555',
                        borderRadius: "50px",
                      }
                    }}

                  >

                    {htmlFor == "welcome" && `You are now in Fantasy Island. Choose your favourite avatar before start your exploration.`}
                    {htmlFor == "Info Board" && `Congrats! You can now play a game in the fantasy island. Go to future teleport at the end of this tunnel to explore the island.`}
                    {htmlFor == "instruction" && <InstructionCtx />}
                    {htmlFor == "menu" && <ListMenu />}
                    {htmlFor == "avatar" && <AvatarCard setAvatarButton={setAvatarButton} />}
                    {htmlFor == "needHelp" && <Form />}
                    {htmlFor == "register" && <AuthForm htmlFor={htmlFor} />}
                    {htmlFor == "login" && <AuthForm htmlFor={htmlFor} />}

                    {htmlFor == "product" && "products"}
                    {htmlFor === "video" && "video"}
                    {htmlFor === "booth" && "booth"}
                    {htmlFor === "navBar" && "List of Your Cart"}

                    {htmlFor === "booth" && boothState?.id != 0 && (
                      <Stack
                        spacing={1}
                        sx={{
                          display: " flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          bgcolor: "#f5f5f5",
                        }}
                      >
                        <CardFeed data={boothState?.id} />
                      </Stack>
                    )}

                    {htmlFor === "video" && (
                      <iframe
                        width={matches ? "100%" : "560"}
                        height={matches ? "100%" : "315"}
                        src="https://www.youtube.com/embed/0YO89ssEmq4"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    )}


                  </Box>
                </Slide>

              </DialogContent>

              <DialogActions
                sx={{
                  position: "relative",
                  zIndex: "1000000",
                  p: 0,
                  flexDirection: "column",
                  // width: matches ? "300px" : "300px"
                }}
              >

                <Slide
                  direction="up"
                  in={true}
                  style={{
                    transformOrigin: "0 0 0",
                    position: "relative",
                    zIndex: "1000000",
                  }}
                  {...(true ? { timeout: 1500 } : {})}
                >

                  <Button
                    fullWidth
                    disabled={htmlFor == "avatar" && !isAvatar || htmlFor == "welcome" && !isReady}
                    sx={{
                      my: 2,
                      fontWeight: 900,
                      textAlign: "center",
                      borderRadius: "5px",
                      position: "relative",
                      border: "2px solid white",
                      boxShadow: "0px 1px 0px 0px #fff6af",
                      display: htmlFor == "needHelp" || htmlFor == "Info Board" || htmlFor == "menu" ? "none" : "flex",
                      background: htmlFor == "avatar" && isSuccess ? "linear-gradient(180deg,#89ff68 0%,#336d16 100%);" : "linear-gradient(to bottom, #ffec64 5%, #ffab23 100%)",
                      color: htmlFor == "avatar" && isSuccess ? "#333333" : "#333333",
                    }}
                    onClick={(() => {
                      htmlFor == "login" && loginButton()
                      htmlFor == "register" && registerButton()
                      htmlFor == "avatar" && handleAvatar()
                      htmlFor == "instruction" && handleInst()
                      htmlFor == "welcome" && handleClose()

                    })}
                    endIcon={htmlFor == "avatar" && isLoading && <CircularProgress sx={{ color: "black" }} size={24} />}
                  >

                    {htmlFor == "register" && "Start"}
                    {htmlFor == "login" && "Submit"}
                    {htmlFor == "welcome" && <WelcomeButton handleReady={handleReady} isReady={isReady} />}
                    {htmlFor == "instruction" && "Start"}
                    {htmlFor == "avatar" && isSuccess && "Success"}
                    {htmlFor == "avatar" && !isSuccess && "Start"}
                  </Button>

                </Slide>

              </DialogActions>

            </Stack>
          </AnimateBox>
        </ClickAwayListener>
      </BootstrapDialog>
    </>
  );
}
