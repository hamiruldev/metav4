import React, { forwardRef } from 'react'
import { Box, Slide, Typography } from '@mui/material'
import { HTML } from 'lingo3d-react'
import AnimText from '@lincode/react-anim-text'

const HtmlTxt = forwardRef((props, ref) => {

    const { id, text, url } = props

    return (
        <>
            <HTML>
                <>
                    <Box name={`htmlRef${id}`} id={`htmlRef${id}`} ref={ref} className="BoxHtmlMesh"
                        sx={{
                            visibility: "hidden",
                            maxWidth: "max-content",
                            '&:before': {
                                content: `" "`,
                                position: "absolute",
                                right: "45%",
                                top: "-15.55px",
                                borderTop: "none",
                                borderRight: "15px solid transparent",
                                borderLeft: "15px solid transparent",
                                borderBottom: "15px solid rgba(0,0,0,0.7)",
                            }
                        }}>
                        <Typography variant="body2" sx={{ textAlign: "center" }}>
                            {text}
                        </Typography>
                    </Box>
                </>

            </HTML>
        </>
    )
})

export default HtmlTxt