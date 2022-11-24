import { Button, CircularProgress, useMediaQuery } from '@mui/material';
import React, { Suspense } from 'react'
import ResponsiveDrawer from '../component/Drawer'
import ArrowCircleLeftSharpIcon from "@mui/icons-material/ArrowCircleLeftSharp";
import { useNavigate } from "react-router-dom";

const Iframe = ({ url }) => {
    return (
        <>
            <Suspense fallback={<>
                <CircularProgress sx={{ color: "white" }} />
            </>}>
                <iframe
                    style={{
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        border: '0px',
                        backgroundColor: '#121113',
                        // position: "relative",
                        // zIndex: "100000000",
                        // top: "56px"
                    }}
                    src={url}
                />
            </Suspense>
        </>
    )
}

export default Iframe
