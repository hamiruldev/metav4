import React, { useEffect, useRef, useState } from 'react'
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
import { getAchievementById, getleaderboard } from '../../api/gameApi';

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
        status: false
    },
    {
        id: 6,
        title: "STAR PLAYER",
        task: 'Be the 1st ranking',
        status: false
    },

]

const Achievement = () => {
    const matches = useMediaQuery("(max-width:425px)");
    const [isLoading, setLoading] = useState(true);
    const [userRank, setUser] = useState({ rank: 0, sum: 0 });

    const cardRef = useRef(null)

    const { avatar_id, username, user_id } = JSON.parse(sessionStorage.getItem("user"))

    const achimevemnt1 = document.getElementById('achimevemnt1')
    const achimevemnt2 = document.getElementById('achimevemnt2')
    const achimevemnt3 = document.getElementById('achimevemnt3')
    const achimevemnt4 = document.getElementById('achimevemnt4')
    const achimevemnt5 = document.getElementById('achimevemnt5')
    const achimevemnt6 = document.getElementById('achimevemnt6')

    const checkSum = (sum) => {

        setTimeout(() => {

            console.log("sum", sum)

            if (sum == undefined) {
                achimevemnt1.style.opacity = 1
                achimevemnt2.style.opacity = 0.5
                achimevemnt3.style.opacity = 0.5
                achimevemnt4.style.opacity = 0.5
                achimevemnt5.style.opacity = 0.5
                achimevemnt6.style.opacity = 0.5
            }

            if (sum == 1) {
                achimevemnt1.style.opacity = 1
                achimevemnt2.style.opacity = 1
                achimevemnt3.style.opacity = 0.5
                achimevemnt4.style.opacity = 0.5
                achimevemnt5.style.opacity = 0.5
                achimevemnt6.style.opacity = 0.5
            }

            if (sum == 2) {
                achimevemnt1.style.opacity = 1
                achimevemnt2.style.opacity = 1
                achimevemnt3.style.opacity = 1
                achimevemnt4.style.opacity = 0.5
                achimevemnt5.style.opacity = 0.5
                achimevemnt6.style.opacity = 0.5
            }

            if (sum == 3) {
                achimevemnt1.style.opacity = 1
                achimevemnt2.style.opacity = 1
                achimevemnt3.style.opacity = 1
                achimevemnt4.style.opacity = 1
                achimevemnt5.style.opacity = 0.5
                achimevemnt6.style.opacity = 0.5
            }

            if (sum == 4) {
                achimevemnt1.style.opacity = 1
                achimevemnt2.style.opacity = 1
                achimevemnt3.style.opacity = 1
                achimevemnt4.style.opacity = 1
                achimevemnt5.style.opacity = 1
                achimevemnt6.style.opacity = 0.5
            }

            if (sum > 5) {
                achimevemnt1.style.opacity = 1
                achimevemnt2.style.opacity = 1
                achimevemnt3.style.opacity = 1
                achimevemnt4.style.opacity = 1
                achimevemnt5.style.opacity = 1
                achimevemnt6.style.opacity = 1
            }

        }, 1000);



    }


    /* A hook that is called when the component is mounted. */
    useEffect(() => {
        let timer1 = setTimeout(() => setLoading(false), 1000);

        /* A function that is called when the component is mounted. */
        getleaderboard().then((res) => {
            const arrayData = res?.data?.data
            const pos = arrayData.map(e => e.user_id).indexOf(user_id);
            const filterData = res?.data?.data?.filter((item) => item?.user_id == user_id)


            setUser({ rank: pos, sum: filterData[0]?.sum })

        })
        return () => {
            clearTimeout(timer1);
        };
    }, []);

    console.log("userRank", userRank)


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

                    {mockAchievement?.map((i, k) => {

                        return (<>
                            <Grid item key={k}>
                                <Card key={k}
                                    ref={cardRef}
                                    id={`achimevemnt${i?.id}`}
                                    sx={{
                                        display: 'flex',
                                        width: matches ? "250px" : "304px",
                                        justifyContent: "flex-start !important",
                                        textAlign: "start",
                                        opacity: 0.5
                                    }}>
                                    <Box

                                        sx={{
                                            p: 2,
                                            borderRadius: "5px",
                                            borderBottom: "0.5px solid orange",
                                            borderRight: "1px solid orange",
                                            borderLeft: "4px solid orange",
                                            borderTop: "4px solid orange",
                                        }}>
                                        {i.title == "SUCCESS" && <PersonIcon sx={{ color: "orange", fontSize: '3.5rem' }} />}
                                        {i.title == "5K SCORE" && <FiveKIcon sx={{ color: "orange", fontSize: '3.5rem' }} />}
                                        {i.title == "10K SCORE" && <OneKkIcon sx={{ color: "orange", fontSize: '3.5rem' }} />}
                                        {i.title == "30K SCORE" && <OneKkIcon sx={{ color: "orange", fontSize: '3.5rem' }} />}
                                        {i.title == "MASTER COINS" && <MilitaryTechOutlinedIcon sx={{ color: "orange", fontSize: '3.5rem' }} />}
                                        {i.title == "STAR PLAYER" && <StarOutlinedIcon sx={{ color: "orange", fontSize: '3.5rem' }} />}
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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

            {
                userRank && checkSum(userRank?.sum)
            }
        </>
    )
}

export default Achievement