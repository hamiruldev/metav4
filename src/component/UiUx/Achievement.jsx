import React from 'react'
import { Box, Card, CardContent, CardMedia, DialogContent, DialogContentText, Grid, Paper, Typography, useMediaQuery } from '@mui/material'

import PersonIcon from '@mui/icons-material/Person';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SavingsIcon from '@mui/icons-material/Savings';
import HttpsIcon from '@mui/icons-material/Https';

const mockAchievement = [
    {
        id: 1,
        title: "SUCCESS",
        task: 'Completed register',
        Boolen: true
    },
    {
        id: 2,
        title: "5K SCORE",
        task: 'Collect 5,000 coins',
        Boolen: true
    },
    {
        id: 3,
        title: "10K SCORE",
        task: 'Collect 10,000 coins',
        Boolen: true
    },
    {
        id: 4,
        title: "30K SCORE",
        task: 'Collect 30,000 coins',
        Boolen: false
    },
    {
        id: 5,
        title: "MASTER COINS",
        task: 'Collect 100,000 coins',
        Boolen: false
    },
    {
        id: 6,
        title: "STAR PLAYER",
        task: 'Be the 1st ranking',
        Boolen: false
    },

]

const Achievement = () => {
    const matches = useMediaQuery("(max-width:425px)");


    return (
        <>
            <Box
                sx={{
                    overflowY: "scroll",
                    height: "50vh",
                    padding: "16px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    scrollbarWidth: 'thin',
                    '&::-webkit-scrollbar': {
                        width: '0.7em'
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: 'white',
                        borderRadius: '5px',
                        p: 2
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#b5a837',
                        borderRadius: '5px',
                        position: 'relative',
                        left: '20px',
                        border: "3px solid white",
                        mr: 3
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#b5a837'
                    }
                }}
            >
                <Grid container spacing={3}
                    sx={{
                        justifyContent: "center;"
                    }}
                >


                    {mockAchievement?.reverse().map((i, k) => {
                        console.log("masuk")
                        return (<>
                            <Grid item key={k}>
                                <Card key={k} sx={{
                                    display: 'flex',
                                    backgroundColor: "grey !important",
                                    width: matches ? "250px" : "304px",
                                    justifyContent: "flex-start !important",
                                    border: "2px solid white"
                                }}>

                                    {/* <CardMedia
                                        component="img"
                                        sx={{ width: matches ? "20%" : 151 }}
                                        image="/img/avatar/avatar1.jpg"
                                        alt="Live from space album cover"
                                    /> */}

                                    <Box sx={{
                                        p: 2,
                                        border: '1px solid white',
                                        borderRadius: "5px"
                                    }}>
                                        <PersonIcon fontSize='medium' sx={{ color: "orange" }} />
                                    </Box>

                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flex: '1 0 auto', color: "white" }}>
                                            <Typography component="div" variant="h6">
                                                {i.title}
                                            </Typography>
                                            <Typography variant="subtitle1" component="div">
                                                {i.task}
                                            </Typography>
                                        </CardContent>
                                    </Box>


                                </Card>
                            </Grid>
                        </>)
                    })}




                </Grid>

            </Box>

        </>
    )
}

export default Achievement