import { Box, Button, Stack, Tab, Tabs, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TabPanel from './TabPanel';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Profile from './Profile';
import Achievement from './Achievement';


const ListMenu = () => {
    const matches = useMediaQuery("(max-width:425px)");

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue, text) => {

        const titleEl = document.getElementById("titleDialog")
        const menuTitle = document.getElementById(text)

        titleEl.textContent = text != 'menu' ? menuTitle?.textContent : 'MENU'

        setValue(newValue);
    };


    return (
        <>
            <Stack direction={"column"} width={value == 0 ? "unset" : "100%"}>

                {value != 0 &&
                    <Box
                        sx={{
                            width: '100%',
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center"
                        }}
                    >
                        <Button variant='text'
                            startIcon={<ArrowBackIcon />}
                            onClick={((e) => {
                                handleChange(e, 0, "menu")
                            })}
                            sx={{
                                border: "none",
                                color: "white"
                            }}
                        >
                            back
                        </Button>
                    </Box>
                }


                <Box
                    sx={{
                        width: matches ? "100%" : value == 0 ? "300px" : "100%"
                    }}
                >


                    {value == 0 ?
                        <>
                            <Button
                                id="profileButton"
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
                                onClick={((e) => {
                                    handleChange(e, 1, "profileButton")
                                })}
                            >
                                P R O F I L E
                            </Button>

                            <Button
                                fullWidth
                                id="achievementButton"
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
                                onClick={((e) => {
                                    handleChange(e, 2, "achievementButton")
                                })}
                            >
                                A C H I E V E M E N T
                            </Button>

                            <Button
                                id="leaderBoardButton"
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
                                onClick={((e) => {
                                    handleChange(e, 3, 'leaderBoardButton')
                                })}
                            >
                                L E D E A R B O A R D
                            </Button>

                            <Button
                                id="exitButton"
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
                                onClick={((e) => {
                                    handleChange(e, 4, 'exitButton')
                                })}
                            >
                                E X I T
                            </Button>
                        </>
                        :
                        <>

                            <Tabs sx={{ minHeight: "10px" }} value={value} onChange={handleChange} aria-label="basic tabs example" />

                            <TabPanel value={value} index={1}>
                                <Profile />
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <Achievement />
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                Item Three
                            </TabPanel>
                            <TabPanel value={value} index={4}>
                                Item Three
                            </TabPanel>
                        </>
                    }

                </Box>
            </Stack>
        </>
    )
}

export default ListMenu