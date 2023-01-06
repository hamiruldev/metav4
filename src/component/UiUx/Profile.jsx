import { useEffect, useState } from 'react';
import { Box, CircularProgress, Skeleton, Stack, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import LinearWithValueLabel from './ProgressBarProps';
import { getProfile } from '../../api/authApi';
import { getleaderboard } from '../../api/gameApi';

const Profile = () => {
    const matches = useMediaQuery("(max-width:425px)");
    const [isLoading, setLoading] = useState(true);
    const [userRank, setUser] = useState({ rank: 0, sum: 0 });

    const { avatar_id, username, user_id } = JSON.parse(sessionStorage.getItem("user"))

    useEffect(() => {
        let timer1 = setTimeout(() => setLoading(false), 1000);

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


    return (
        <>
            <Box sx={{ py: 5 }}>

                <Stack direction={matches ? "column" : "row"} sx={{
                    justifyContent: "space-around",
                    alignItems: matches ? "center" : "unset"
                }} >

                    {isLoading == true ?
                        <Skeleton
                            sx={{ bgcolor: 'grey.900', borderRadius: "10px", border: "5px solid white" }}
                            variant="rectangular"
                            width={matches ? "50%" : "30%"}
                            height={'140.135px'}
                        >
                            <CircularProgress />
                        </Skeleton>
                        : <img src={`img/avatar/avatar${avatar_id}.jpg`} width={matches ? "50%" : "30%"} style={{ borderRadius: "10px", border: "5px solid white" }} />}

                    <Box sx={{
                        p: 2,
                        pl: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: matches ? "center" : "self-start",
                        justifyContent: "space-evenly",
                    }}>
                        <Typography variant='h6'>
                            Username: {username}
                        </Typography>
                        <Typography variant='h6'>
                            {`🏆 Rangking: #${userRank?.rank + 1}`}
                        </Typography>
                    </Box>
                </Stack>

                <br />

                <Stack direction={"row"}
                    sx={{
                        justifyContent: "center",
                        mt: matches ? 0 : 3
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

                        <LinearWithValueLabel value={userRank?.sum} />

                    </Box>
                </Stack>
            </Box>

        </>
    )
}

export default Profile