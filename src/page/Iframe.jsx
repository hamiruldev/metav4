import { Button, useMediaQuery } from '@mui/material';
import React from 'react'
import ResponsiveDrawer from '../component/Drawer'
import ArrowCircleLeftSharpIcon from "@mui/icons-material/ArrowCircleLeftSharp";
import { useNavigate } from "react-router-dom";

const Iframe = ({ url }) => {
    const navigate = useNavigate();
    const matches = useMediaQuery("(max-width:425px)");
    return (
        <>
            <ResponsiveDrawer />
            <Button
                variant="contained"
                startIcon={<ArrowCircleLeftSharpIcon />}
                sx={{
                    position: " absolute",
                    top: "10%",
                    zIndex: "1",
                    left: "3%",
                    display: matches ? 'inline-flex' : 'none',
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
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    border: '0px',
                    backgroundColor: 'black',
                }}
                src={url}
            />
        </>
    )
}

export default Iframe
