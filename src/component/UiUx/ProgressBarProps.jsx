import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Chip, Stack } from '@mui/material';


function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ width: '100%', mr: 1, height: 0 }}>
            <LinearProgress variant="determinate" {...props} />
            <Stack

                sx={{
                    position: "relative",
                    top: "-32px",
                    width: "max-content",
                    left: `${props.value}%`
                }}
            >
                <Typography variant="body2"
                    sx={{ color: "white", }}
                >{`${props.value !== undefined ? Math.round(props.value) : 0}`}
                </Typography>

                <MonetizationOnIcon
                    sx={{
                        background: "black",
                        borderRadius: "50px",
                        color: "orange",
                    }}
                >

                </MonetizationOnIcon>
            </Stack>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};

export default function LinearWithValueLabel({ value }) {

    return (
        <Box sx={{ width: '50%' }}>
            <LinearProgressWithLabel value={value} />
        </Box>
    );
}
