import React, { useEffect, useState, useLayoutEffect } from "react";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { Button } from "@mui/material";

const AudioBcg = () => {
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

    const audio = document.getElementById("playAudio")

    const [isAudio, setAudio] = useState(true);

    useLayoutEffect(() => {
        if (!isAudio) audio?.pause();
        if (isAudio) audio?.play();
    }, [isAudio]);

    return (
        <>
            <audio
                controls
                loop
                style={{ position: "relative", zIndex: "100", display: "none" }}
                id="playAudio"
            >
                <source src="audio/bcg1.mp3" />
            </audio>
            <Button
                id="buttonAudio"
                sx={{
                    color: "white",
                    border: "0px"
                }}
                variant="text"
                startIcon={isAudio ? <MusicOffIcon /> : <MusicNoteIcon />}
                onClick={() => {
                    isAudio ? setAudio(false) : setAudio(true);
                }}
            >
                {isAudio ? "Off Music" : "On Music"}
            </Button>
        </>
    );
};

export default AudioBcg;
