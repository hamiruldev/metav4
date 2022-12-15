import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, CircularProgress, ClickAwayListener, Stack } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";
import { IconButton, Slide } from "@mui/material";
import { getAllProduct } from "../api/productApi";
import CloseIcon from "@mui/icons-material/Close";
import CardFeed from "./CardFeed";
import Zoom from "@mui/material/Zoom";
import AddToCartTable from "./User/AddToCartTable";
import AuthForm from "./UiUx/AuthForm";
import AvatarCard from "./UiUx/AvatarCard";

var menuData = [{ id: 1, name: 'Intrest form' }, { id: 2, name: 'share' }, { id: 3, name: 'help' }]

const loginButton = () => {
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
    backgroundColor: "transparent !important",
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
  const { children, onClose, ...other } = props;
  const matches = useMediaQuery("(max-width:425px)");

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            backgroundColor: "red",
            color: "white",
            top: matches ? "-5%" : "-8%",
            right: matches ? "-5%" : "-5%",
            borderRadius: "50%",
          }}
        >
          <CloseIcon sx={{ fontSize: matches ? "1em" : "1.5em" }} />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function ScrollDialog({
  htmlFor,
  boothState,
  dataContent,
  open,
  onClose,
  handleClose,
}) {
  const [scroll, setScroll] = React.useState("paper");
  const [isAvatar, setAvatarButton] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [isSuccess, setSuccess] = React.useState(false);
  const matches = useMediaQuery("(max-width:425px)");

  const handleAvatar = () => {

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => {
        handleClose()
        setTimeout(() => {
          setSuccess(false)
          setAvatarButton(false)
        }, 500)
      }, 1500)
    }, 1000);
  }


  return (
    <>
      <BootstrapDialog
        TransitionComponent={Transition}
        fullScreen
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
        onClose={onClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        sx={{ backgroundColor: "transparent" }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Box
            maxWidth={"sm"}
            sx={{
              background: "linear-gradient(to right, #ffe800, #ff8800)",
              padding: " 0.5rem",
              borderRadius: "30px",
              width: "inherit",
            }}
          >
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
                id="customized-dialog-title"
                onClose={onClose}
              />

              <DialogContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  flexDirection: "column",
                  pb: 0,
                }}
                dividers={scroll === "paper"}
              >
                <Typography variant="h4">
                  {htmlFor == "instruction" && "INSTRUCTION"}
                  {htmlFor == "login" && "LOGIN"}
                  {htmlFor == "menu" && "MENU"}
                  {htmlFor == "avatar" && "CHOOSE AVATAR"}

                </Typography>

                <Stack>
                  {htmlFor == "instruction" &&
                    "Five years ago, we lost. All of us. We lost friends... We lost family... We lost a part of ourselves. Today, we have a chance to take it all back."}
                  {htmlFor == "login" && <AuthForm />}

                  {htmlFor == "avatar" && <AvatarCard setAvatarButton={setAvatarButton} />}

                  {htmlFor == "product" && "products"}
                  {htmlFor === "video" && "video"}
                  {htmlFor === "booth" && "booth"}
                  {htmlFor === "navBar" && "List of Your Cart"}

                  {htmlFor === "navBar" && (
                    <>
                      <AddToCartTable data={dataContent} />
                    </>
                  )}

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
                </Stack>
              </DialogContent>

              <DialogActions
                sx={{
                  position: "relative",
                  zIndex: "1000000",
                  p: 0,
                  flexDirection: "column",
                  width: htmlFor == "menu" ? matches ? "80%" : "50%" : null
                }}
              >

                {htmlFor == "menu" ?
                  <> <Slide
                    direction={"up"}
                    in={true}
                    style={{
                      transformOrigin: "0 0 0",
                      position: "relative",
                      zIndex: "1000000",
                    }}
                    {...(true ? { timeout: 1500 } : {})}
                  >

                    <Box>

                      <Button
                        fullWidth
                        sx={{
                          border: "2px solid white",
                          borderRadius: "5px",
                          my: 1,
                          boxShadow: "0px 1px 0px 0px #fff6af",
                          background: "linear-gradient(to bottom, #ffec64 5%, #ffab23 100%)",
                          backgroundColor: "#ffec64",
                          color: "#333333",
                          position: "relative",
                          zIndex: "10000000",
                          fontWeight: 900,
                        }}
                      >
                        I N T E R E S T F O R M
                      </Button>
                      <Button
                        fullWidth
                        sx={{
                          border: "2px solid white",
                          borderRadius: "5px",
                          my: 1,
                          boxShadow: "0px 1px 0px 0px #fff6af",
                          background: "linear-gradient(to bottom, #ffec64 5%, #ffab23 100%)",
                          backgroundColor: "#ffec64",
                          color: "#333333",
                          position: "relative",
                          zIndex: "10000000",
                          fontWeight: 900,
                        }}
                      >
                        S H A R E
                      </Button>
                      <Button
                        fullWidth
                        sx={{
                          border: "2px solid white",
                          borderRadius: "5px",
                          my: 1,
                          boxShadow: "0px 1px 0px 0px #fff6af",
                          background: "linear-gradient(to bottom, #ffec64 5%, #ffab23 100%)",
                          backgroundColor: "#ffec64",
                          color: "#333333",
                          position: "relative",
                          zIndex: "10000000",
                          fontWeight: 900,
                        }}
                      >
                        H E L P
                      </Button>

                    </Box>
                  </Slide>

                  </>
                  :
                  <>
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
                        disabled={htmlFor == "avatar" && !isAvatar}
                        sx={{
                          my: 2,
                          fontWeight: 900,
                          zIndex: "10000000",
                          borderRadius: "5px",
                          position: "relative",
                          border: "2px solid white",
                          boxShadow: "0px 1px 0px 0px #fff6af",
                          background: htmlFor == "avatar" && isSuccess ? "linear-gradient(180deg,#89ff68 0%,#336d16 100%);" : "linear-gradient(to bottom, #ffec64 5%, #ffab23 100%)",
                          color: htmlFor == "avatar" && isSuccess ? "#333333" : "#333333",
                        }}
                        fullWidth
                        onClick={(() => {
                          htmlFor == "login" && loginButton()
                          htmlFor == "avatar" && handleAvatar()
                        })}
                        endIcon={htmlFor == "avatar" && isLoading && <CircularProgress sx={{ color: "black" }} size={24} />}
                      >

                        {htmlFor == "login" && "Submit"}
                        {htmlFor == "instruction" && "Start"}
                        {htmlFor == "avatar" && isSuccess && "Success"}
                        {htmlFor == "avatar" && !isSuccess && "Start"}
                      </Button>

                    </Slide>
                  </>
                }

              </DialogActions>
            </Stack>
          </Box>
        </ClickAwayListener>
      </BootstrapDialog>
    </>
  );
}
