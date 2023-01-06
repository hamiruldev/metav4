import { Box, Button, Stack, Tab, Tabs, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TabPanel from './TabPanel';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Profile from './Profile';
import Achievement from './Achievement';
import Leaderboard from './Leaderboard';
import Exit from './Exit';


const ListMenu = () => {
    const matches = useMediaQuery("(max-width:425px)");

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue, text) => {

        const titleEl = document.getElementById("titleDialog")
        const menuTitle = document.getElementById(text)

        titleEl.textContent = text != 'menu' ? menuTitle?.textContent : ''

        setValue(newValue);
    };



    return (
        <>
            <Stack direction={"column"} width={value == 0 ? "unset" : "100%"}>

                {value == 0 && <Typography variant={matches ? "h5" : "h4"} sx={{ pb: "5%" }}>
                    MENU
                </Typography>}

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
                                className='ButtonStandard'
                                onClick={((e) => {
                                    handleChange(e, 1, "profileButton")
                                })}
                            >
                                P R O F I L E
                            </Button>

                            <Button
                                fullWidth
                                id="achievementButton"
                                className='ButtonStandard'
                                onClick={((e) => {
                                    handleChange(e, 2, "achievementButton")
                                })}
                            >
                                A C H I E V E M E N T
                            </Button>

                            <Button
                                id="leaderBoardButton"
                                fullWidth
                                className='ButtonStandard'
                                onClick={((e) => {
                                    handleChange(e, 3, 'leaderBoardButton')
                                })}
                            >
                                L E A D E A R B O A R D
                            </Button>

                            <Button
                                id="exitButton"
                                fullWidth
                                className='ButtonStandard'
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
                                <Leaderboard />
                            </TabPanel>
                            <TabPanel value={value} index={4}>
                                <Exit />
                            </TabPanel>
                        </>
                    }

                </Box>
            </Stack>
        </>
    )
}

export default ListMenu