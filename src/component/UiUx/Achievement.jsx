import React from 'react'
import { Box, Card, CardContent, CardMedia, DialogContent, DialogContentText, Grid, Paper, Typography, useMediaQuery } from '@mui/material'

import PersonIcon from '@mui/icons-material/Person';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SavingsIcon from '@mui/icons-material/Savings';
import HttpsIcon from '@mui/icons-material/Https';
import OneKkOutlinedIcon from '@mui/icons-material/OneKkOutlined';
import FiveKOutlinedIcon from '@mui/icons-material/FiveKOutlined';
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';
import OneKkIcon from '@mui/icons-material/OneKk';
import FiveKIcon from '@mui/icons-material/FiveK';

const mockAchievement = [
    {
        id: 1,
        title: "SUCCESS",
        task: 'Completed register',
        status: false
    },
    {
        id: 2,
        title: "5K SCORE",
        task: 'Collect 5k coins',
        status: false
    },
    {
        id: 3,
        title: "10K SCORE",
        task: 'Collect 10k coins',
        status: false
    },
    {
        id: 4,
        title: "30K SCORE",
        task: 'Collect 30k coins',
        status: false
    },
    {
        id: 5,
        title: "MASTER COINS",
        task: 'Collect 100k coins',
        status: true
    },
    {
        id: 6,
        title: "STAR PLAYER",
        task: 'Be the 1st ranking',
        status: true
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
                        backgroundColor: 'transparent',
                        borderRadius: '5px',
                        p: 2
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'orange',
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
                        return (<>
                            <Grid item key={k}>
                                <Card key={k} sx={{
                                    display: 'flex',
                                    width: matches ? "250px" : "304px",
                                    justifyContent: "flex-start !important",
                                    textAlign: "start"
                                }}>
                                    <Box sx={{
                                        p: 2,
                                        borderRadius: "5px",
                                        borderBottom: "0.5px solid orange",
                                        borderRight: "1px solid orange",
                                        borderLeft: "4px solid orange",
                                        borderTop: "4px solid orange",
                                        opacity: i?.status == true ? 0.5 : 1
                                    }}>
                                        {i.title == "SUCCESS" && <PersonIcon sx={{ color: "orange", fontSize: '3.5rem' }} />}
                                        {i.title == "5K SCORE" && <FiveKIcon sx={{ color: "orange", fontSize: '3.5rem' }} />}
                                        {i.title == "10K SCORE" && <OneKkIcon sx={{ color: "orange", fontSize: '3.5rem' }} />}
                                        {i.title == "30K SCORE" && <PersonIcon sx={{ color: "orange", fontSize: '3.5rem' }} />}
                                        {i.title == "MASTER COINS" && <MilitaryTechOutlinedIcon sx={{ color: "orange", fontSize: '3.5rem' }} />}
                                        {i.title == "STAR PLAYER" && <StarOutlinedIcon sx={{ color: "orange", fontSize: '3.5rem' }} />}

                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', opacity: i?.status == true ? 0.5 : 1 }}>
                                        <CardContent sx={{ flex: '1 0 auto', color: "white" }}>
                                            <Typography component="div" variant="body2">
                                                {i.title}
                                            </Typography>
                                            <Typography variant="span" component="div">
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