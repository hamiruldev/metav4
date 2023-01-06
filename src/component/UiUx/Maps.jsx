import { Badge, Box, Grid, Paper, Stack, styled, useMediaQuery } from '@mui/material'
import { width } from '@mui/system';
import React from 'react'

const Maps = () => {

    const matches = useMediaQuery("(max-width:425px)");

    const currentIsland = window.location
    let result = currentIsland?.pathname.includes("main-island");

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: "white",
        maxWidth: "221px",
    }));

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: "#5fff00",
            color: "#5fff00",
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            minWidth: "15px",
            height: "15px",
            lineHeight: 1,
            padding: 0,
            borderRadius: "50px",
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));

    const CheckStatus = (id) => {
        return currentIsland?.pathname.includes(`${id}`);
    }


    return (
        <>
            <Box>
                <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 3 }}

                    sx={{
                        backgroundImage: `url("/img/map/map1.jpg")`,
                        width: "100% !important",
                        height: matches ? "200px" : "404px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        ml: "0px !important",
                        borderRadius: "2%"
                    }}
                >
                    <Grid item xs={6}
                    >
                        <Item
                            sx={{
                                height: matches ? "59px" : "127px"
                            }}
                        >
                            {CheckStatus('japan-island') && <StyledBadge sx={{ color: "red" }} variant="dot" badgeContent={''} />}
                        </Item>
                    </Grid>
                    <Grid item xs={6}

                    >
                        <Item
                            sx={{
                                height: matches ? "59px" : "127px"
                            }}
                        >
                            {CheckStatus('chinese-island') && <StyledBadge sx={{ color: "red" }} variant="dot" badgeContent={''} />}
                        </Item>
                    </Grid>

                    <Grid item xs={12}

                    >
                        <Item
                            sx={{
                                height: matches ? "59px" : "127px",
                                maxWidth: "95%"
                            }}
                        >
                            {CheckStatus('main-island') && <StyledBadge sx={{ color: "red" }} variant="dot" badgeContent={''} />}
                        </Item>
                    </Grid>
                    <Grid item xs={6}

                    >
                        <Item

                            sx={{
                                height: matches ? "59px" : "127px"
                            }}
                        >
                            {CheckStatus('forest-island') && <StyledBadge sx={{ color: "red" }} variant="dot" badgeContent={''} />}
                        </Item>
                    </Grid>
                    <Grid item xs={6}

                    >
                        <Item
                            sx={{
                                height: matches ? "59px" : "127px"
                            }}
                        >
                            {CheckStatus('greek-island') && <StyledBadge sx={{ color: "red" }} variant="dot" badgeContent={''} />}
                        </Item>
                    </Grid>
                </Grid>

            </Box>







        </>
    )
}

export default Maps