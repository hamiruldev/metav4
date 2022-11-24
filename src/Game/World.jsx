import React, { useEffect, useState } from "react";
import _uniqueId from "lodash/uniqueId";

import { usePreload, useWindowSize } from "lingo3d-react";

import { Button, Dialog, DialogContent, DialogTitle, IconButton, Slide, Stack, useMediaQuery } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'

import CircularStatic from "../component/CircularProgressWithLabel";
import ResponsiveDrawer from "../component/Drawer";
import Form from "../component/Form";
import Game from "./Game";



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
                        position: 'absolute',
                        right: 20,
                        top: 10,
                        color: "#FFC000",
                        fontSize: "300px"
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
    const isInital = sessionStorage.getItem("inital")

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
        isInital == null && sessionStorage.setItem("inital", true)
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            isInital && setAnimate(true);
        }, 6000);
        return () => clearTimeout(timer);
    }, []);

    if (progress < 100)
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

    return (
        <>
            {isInital == null &&
                <Button
                    onClick={() => {
                        handleGame()
                        setOpen(true)
                    }}
                    sx={{
                        background: `url( ${windowSize.width < 700
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
            }



            {!matches && <Slide
                direction="down"
                in={startAnimate}
                mountOnEnter
                unmountOnExit
            > <Button className="button-glow" variant="contained"
                sx={{
                    top: `calc(100vh - ${matches ? "90vh" : "95vh"})`,
                    border: "2px solid #c4a300 !important",
                    backgroundColor: "rgb(0 0 0 / 80%)",
                    position: "relative",
                    zIndex: "10000",
                }}

                onClick={(() => {
                    setOpen(true)
                })}
            >
                    Need help ?
                </Button></Slide>}

            <Dialog
                maxWidth={"md"}
                open={open}
                onClose={handleClose}
                sx={{
                    position: "relative",
                    zIndex: "10000000000000000",
                    '& .MuiDialog-paper': {
                        background: "black",
                        border: "2px solid #FFC000",
                        color: "white",
                        width: "-webkit-fill-available",
                        borderRadius: "50px",
                    },
                }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} />
                <DialogContent>
                    <Form />
                </DialogContent>
            </Dialog>

            <ResponsiveDrawer />

            {matches &&
                <Slide
                    direction="down"
                    in={startAnimate}
                    mountOnEnter
                    unmountOnExit
                >
                    <Button className="button-glow" variant="contained"
                        sx={{
                            top: `calc(100vh - ${matches ? "95vh" : "95vh"})`,
                            border: "2px solid #c4a300 !important",
                            backgroundColor: "rgb(0 0 0 / 80%)",
                            position: "relative",
                            zIndex: "1000",
                        }}

                        onClick={(() => {
                            setOpen(true)
                        })}
                    >
                        Need help ?
                    </Button>
                </Slide>
            }
            <Game />
        </>
    );
};

export default World;
