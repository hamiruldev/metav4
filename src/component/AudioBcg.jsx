import React, { useEffect, useState, useRef } from "react";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { Button } from "@mui/material";

const AudioBcg = () => {
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

    const videoRef = useRef()
    const [isAudio, setAudio] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            if (!isAudio) videoRef?.current?.pause();
            if (isAudio) {
                videoRef?.current.play()
            }
        }, 1000);


    }, [isAudio]);

    return (
        <>
            <audio
                autoPlay
                ref={videoRef}
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
