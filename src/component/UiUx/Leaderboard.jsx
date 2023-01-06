import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Grid, Card, CardContent, Typography, useMediaQuery, Stack, Slide, Skeleton } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import { getleaderboard } from '../../api/gameApi';
import { useState, useEffect } from 'react';

const mockLeader = [
    {
        id: 1,
        rank: 1,
        username: 'Kelvin_98',
        score: 15200
    },
    {
        id: 2,
        rank: 2,
        username: 'Mia009_',
        score: 15200
    },
    {
        id: 3,
        rank: 3,
        username: 'SamKyle',
        score: 15200
    },
    {
        id: 4,
        rank: 4,
        username: 'SamKyle',
        score: 15200
    },
    {
        id: 5,
        rank: 5,
        username: 'SamKyle',
        score: 15200
    },
    {
        id: 6,
        rank: 6,
        username: 'SamKyle',
        score: 15200
    },
    {
        id: 6,
        rank: 6,
        username: 'SamKyle',
        score: 15200
    },
    {
        id: 6,
        rank: 6,
        username: 'SamKyle',
        score: 15200
    },
]

const Leaderboard = () => {

    const matches = useMediaQuery("(max-width:425px)");

    const [isLoading, setLoading] = useState(true);
    const [players, setPlayers] = useState([]);

    const { avatar_id, username, user_id } = JSON.parse(sessionStorage.getItem("user"))

    useEffect(() => {


        getleaderboard().then((res) => {
            const arrayData = res?.data?.data
            setPlayers(arrayData)
            setLoading(false)
        })

    }, []);

    return (
        <>
            <Box
                sx={{

                    padding: "17px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    scrollbarWidth: 'thin',
                }}
            >
                <Grid container spacing={3}
                    sx={{
                        justifyContent: "center;"
                    }}

                >
                    <Grid item >
                        <Card sx={{
                            width: matches ? "250px" : "404px",
                            textAlign: "start",
                            border: '2px solid white',
                            position: "relative",
                            left: "-4px",
                        }}
                            className='ButtonStandard'
                        >

                            <Box sx={{ display: 'flex', flexDirection: 'row', width: "100%" }}

                            >
                                <CardContent

                                    sx={{
                                        flex: '1 0 auto',
                                        display: 'flex',
                                        width: "100%",
                                        flexDirection: "row",
                                        justifyContent: "space-around",
                                        pb: 0,
                                        p: 0,
                                        paddingBottom: "0px !important",
                                        alignItems: "center",
                                        color: "black",
                                        fontWeight: "bold"
                                    }}>
                                    <Typography component="div" variant="body2" sx={{
                                        width: "10%",
                                        fontWeight: "bold"
                                    }}>
                                        Rank
                                    </Typography>
                                    <Typography variant="span" component="div">
                                        Username
                                    </Typography>
                                    <Typography variant="span" component="div">
                                        Score
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

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
                <Grid container spacing={0}
                    sx={{
                        justifyContent: "center;"
                    }}>

                    {isLoading && <Grid item sx={{ pb: 2 }} >
                        <Card sx={{
                            display: 'flex',
                            width: matches ? "250px" : "404px",
                            textAlign: "start",
                            border: '1px solid white',
                            flexDirection: "row",
                            justifyContent: "space-around",
                            pb: 0,
                            p: 0
                        }}>

                            <Box sx={{ display: 'flex', flexDirection: 'row', width: "100%" }}>
                                <CardContent sx={{
                                    flex: '1 0 auto', color: "white",
                                    display: 'flex',
                                    width: "100%",
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                    pb: "0px !important",
                                    p: 0,
                                    alignItems: "center"
                                }}>

                                    <Stack direction="row"
                                        sx={{
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            width: "10%"
                                        }}
                                    >
                                        <Typography component="div" variant="body2">
                                            <Skeleton sx={{ bgcolor: 'grey.900' }} width={50} />
                                        </Typography>
                                    </Stack>

                                    <Typography variant="span" component="div">
                                        <Skeleton sx={{ bgcolor: 'grey.900' }} width={100} />
                                    </Typography>
                                    <Typography variant="span" component="div">
                                        <Skeleton sx={{ bgcolor: 'grey.900' }} width={40} />
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Card>
                    </Grid>}


                    {players?.map((i, k) => {
                        return (
                            <div key={k}>
                                <Grid item key={k}

                                    sx={{ pb: 2 }}
                                >
                                    <Card key={k} sx={{
                                        display: 'flex',
                                        width: matches ? "250px" : "404px",
                                        textAlign: "start",
                                        border: '1px solid white',
                                        flexDirection: "row",
                                        justifyContent: "space-around",
                                        pb: 0,
                                        p: 0
                                    }}>

                                        <Box sx={{ display: 'flex', flexDirection: 'row', width: "100%" }}>
                                            <CardContent sx={{
                                                flex: '1 0 auto', color: "white",
                                                display: 'flex',
                                                width: "100%",
                                                flexDirection: "row",
                                                justifyContent: "space-around",
                                                pb: "0px !important",
                                                p: 0,
                                                alignItems: "center"
                                            }}>

                                                <Stack direction="row"
                                                    sx={{
                                                        alignItems: "center",
                                                        justifyContent: "space-between",
                                                        width: "10%"
                                                    }}
                                                >
                                                    <StarIcon sx={{ color: "orange", fontSize: "1.5em" }} />
                                                    <Typography component="div" variant="body2">
                                                        #{k + 1}
                                                    </Typography>

                                                </Stack>

                                                <Typography variant="span" component="div">
                                                    {i.username}
                                                </Typography>
                                                <Typography variant="span" component="div">
                                                    {i.sum}
                                                </Typography>
                                            </CardContent>
                                        </Box>
                                    </Card>
                                </Grid>
                            </div>)
                    })}

                </Grid>
            </Box>
        </>
    )
}

export default Leaderboard