import React from 'react'
import { Box, Typography, Button, Stack } from '@mui/material'

const Exit = () => {

    const closeWin = () => {
        window.close();
    }

    return (
        <>
            <Box
                sx={{

                    pb: 5,
                    display: "flex",
                    justifyContent: "center",
                    // alignItems: "flex-start",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography variant='h4' sx={{
                    width: "70%",
                }}>
                    Do you really want to exit?
                </Typography>

                <br />

                <Stack direction="row" spacing={2}>
                    <Button variant="contained"
                        sx={{
                            boxShadow: "0px 1px 0px 0px #fff6af",
                            background: "linear-gradient(to bottom, #ffec64 5%,#ffab23 100%)",
                            backgroundColor: "#ffec64",
                            borderRadius: "6px",
                            border: "1px solid #white",
                            display: "inline-block",
                            cursor: "pointer",
                            color: "#333333",
                            fontFamily: "Arial",
                            fontSize: "15px",
                            fontWeight: "bold",
                            padding: "6px 24px",
                            textDecoration: "none",
                            textShadow: "0px 1px 0px #ffee66",
                        }}
                        onClick={(() => {
                            closeWin()
                        })}
                    >
                        yes
                    </Button>

                    <Button variant="contained"
                        sx={{
                            boxShadow: "0px 1px 0px 0px #fff6af",
                            background: "linear-gradient(to bottom, #ffec64 5%,#ffab23 100%)",
                            backgroundColor: "#ffec64",
                            borderRadius: "6px",
                            border: "1px solid #white",
                            display: "inline-block",
                            cursor: "pointer",
                            color: "#333333",
                            fontFamily: "Arial",
                            fontSize: "15px",
                            fontWeight: "bold",
                            padding: "6px 24px",
                            textDecoration: "none",
                            textShadow: "0px 1px 0px #ffee66",
                        }}
                    >
                        No
                    </Button>
                </Stack>

            </Box>
        </>
    )
}

export default Exit