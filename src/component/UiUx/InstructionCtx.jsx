import React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import MouseIcon from '@mui/icons-material/Mouse';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

import { Typography, useMediaQuery } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    color: "white"
}));


const InstructionCtx = () => {
    const matches = useMediaQuery("(max-width:425px)");


    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
                    sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        pb: 2
                    }}
                >
                    <Grid item xs={6} md={2}>
                        <Item>

                            {matches ?
                                <RadioButtonCheckedIcon
                                    sx={{
                                        fontSize: "110px",
                                    }}
                                /> :
                                <MouseIcon
                                    sx={{
                                        fontSize: "110px",
                                        position: "relative",
                                        left: !matches && "40px",
                                    }}
                                />
                            }

                        </Item>
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <Item
                            sx={{
                                textAlign: !matches && "initial",
                            }}

                        >
                            {matches ?
                                `Use joystick below to control your avatar’s and went the world` : ` Click the world to lock the cursor and control your avatar’s`}

                        </Item>
                    </Grid>
                </Grid>
                <Typography>
                    Take a look around and familiarize yourself with the island.
                </Typography>
            </Box>
        </>
    )
}

export default InstructionCtx