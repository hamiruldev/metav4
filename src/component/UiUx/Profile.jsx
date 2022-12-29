import { Box, Stack, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import LinearWithValueLabel from './ProgressBarProps';

const Profile = () => {

    const matches = useMediaQuery("(max-width:425px)");


    return (
        <>
            <Box sx={{ py: 5 }}>

                <Stack direction={matches ? "column" : "row"} sx={{
                    justifyContent: "center",
                    alignItems: matches ? "center" : "unset"
                }} >
                    <img src={`img/avatar/avatar1.jpg`} width={matches ? "50%" : "30%"} style={{ borderRadius: "10px", border: "5px solid white" }} />
                    <Box sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: matches ? "center" : "self-start",
                        justifyContent: "space-evenly",
                        // position: matches ? "unset" : "relative",
                        // right: matches ? "0" : "10%",

                    }}>
                        <Typography variant='h6'>
                            Username: Kelvin_98
                        </Typography>
                        <Typography variant='h6'>
                            🏆 Rangking: #1
                        </Typography>
                    </Box>
                </Stack>

                <br />

                <Stack direction={"row"}
                    sx={{
                        justifyContent: "center"
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            height: matches ? "100%" : "50%",

                        }}
                    >
                        <div style={{
                            maxWidth: matches ? "unset" : "max-content",
                        }}>
                            <Typography variant='h6'>
                                Best Score
                            </Typography>
                        </div>


                        <LinearWithValueLabel />

                    </Box>
                </Stack>
            </Box>

        </>
    )
}

export default Profile