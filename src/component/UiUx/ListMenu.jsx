import { Box, Button, useMediaQuery } from '@mui/material'
import React from 'react'

const ListMenu = () => {
    const matches = useMediaQuery("(max-width:425px)");

    return (
        <>
            <Box
                sx={{
                    width: matches ? "300px" : "300px"
                }}
            >
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
        </>
    )
}

export default ListMenu