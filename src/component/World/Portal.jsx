import { forwardRef, useRef } from 'react'
import { AreaLight, Group, Model, Trigger, HTML, useScene } from 'lingo3d-react'
import { Box, Typography } from '@mui/material'
import { createRef } from 'react'



const Portal = forwardRef((props, ref) => {

    const htmlRef = createRef(null)

    const {
        nameId,
        x,
        y,
        z,
        rotationY,
        rotationX,
        rotationZ,
        scale,
        handleClick,
        handleOnPlayerFly,
        handleOutPlayerFly,
    } = props

    const openPortal = (url) => {

        // window.open(url, "_blank  ") 
        console.log("htmlRef", htmlRef.current)


    }


    return (
        <>

            <Group
                name={nameId}
                x={x}
                y={y}
                z={z}
                rotationY={rotationY}
                rotationX={rotationX}
                rotationZ={rotationZ}
                scale={scale}
            >

                <AreaLight
                    rotationX={177.94}
                    scale={2}
                    opacityFactor={10}
                    intensity={50.00}
                    color={"#0368ff"}
                    visible={false}
                />

                <Model
                    name="portalModel1"
                    ref={ref}
                    adjustColor="#00fff2"
                    physics="map"
                    width={245.36}
                    depth={245.36}

                    scale={34.99}

                    x={13475.40}
                    y={-3747.40}
                    z={4060.09}

                    rotationX={-77.31}
                    rotationY={-2.72}
                    rotationZ={-124.30}

                    src="maps/item/stargate.glb"
                    onClick={((e) => {
                        handleClick(e)
                    })}
                >



                </Model>

                <Trigger
                    name="triggerModel1"
                    targetIds="player"
                    radius={1434.65}

                    x={13475.40}
                    y={-3747.40}
                    z={4060.09}

                    interval={1}

                    onEnter={(() => {
                        handleOnPlayerFly()
                        openPortal()
                    })}
                    onExit={(() => {
                        handleOutPlayerFly()
                    })}
                />

                <Model
                    ref={ref}
                    name="portalModel2"
                    adjustColor="#00fff2"
                    physics="map"
                    width={245.36}
                    depth={245.36}

                    scale={34.99}

                    x={-1703.08}
                    y={-5032.29}
                    z={6898.37}

                    rotationX={-79.42}
                    rotationY={-0.43}
                    rotationZ={144.73}

                    src="maps/item/stargate.glb"
                    onClick={((e) => {
                        handleClick(e)
                    })}
                >

                </Model>

                <Trigger
                    name="triggerModel2"
                    targetIds="player"
                    radius={1434.65}

                    x={-1707.08}
                    y={-5089.14}
                    z={6920.60}


                    interval={1}

                    onEnter={(() => {
                        handleOnPlayerFly()
                    })}
                    onExit={(() => {
                        handleOutPlayerFly()
                    })}
                />

                <Model
                    name="portalModel3"
                    ref={ref}
                    adjustColor="#00fff2"
                    physics="map"
                    width={245.36}
                    depth={245.36}

                    scale={34.99}


                    x={-5328.97}
                    y={-1881.58}
                    z={-7548.52}

                    rotationX={-75.44}
                    rotationY={-1.45}
                    rotationZ={56.76}

                    src="maps/item/stargate.glb"
                    onClick={((e) => {
                        handleClick(e)
                    })}
                >

                    <HTML
                        ref={htmlRef}
                        visible={true}
                        x={-31.44}
                        y={-106.08}
                        z={927.94}
                    >
                        <Box
                            sx={{
                                mt: 2,
                                padding: "30px",
                                height: "max-content",
                                color: "white",
                                borderRadius: "20px",
                                backdropFilter: "blur(4px)",
                                webkitBackdropFilter: "blur(4px)",
                                background: "rgba(0,0,0,0.7)",
                                border: "1px solid rgba(255,255,255,0.18)",
                                boxShadow: "0 8px 32px 0 rgba(31,38,135,0.37)",
                                '&:before': {
                                    content: `" "`,
                                    position: "absolute",
                                    right: "30px",
                                    top: "-15.55px",
                                    borderTop: "none",
                                    borderRight: "15px solid transparent",
                                    borderLeft: "15px solid transparent",
                                    borderBottom: "15px solid rgba(0,0,0,0.7)",
                                }
                            }}
                        >
                            <Typography variant="h2">{"Travel to Japanese Island"}</Typography>
                        </Box>
                    </HTML>

                </Model>

                <Trigger
                    name="triggerModel3"
                    targetIds="player"
                    radius={1434.65}

                    x={-5559.07}
                    y={-1836.57}
                    z={-7679.60}

                    interval={1}

                    onEnter={(() => {
                        handleOnPlayerFly()
                    })}
                    onExit={(() => {
                        handleOutPlayerFly()
                    })}
                />

                <Model
                    name="portalModel4"
                    ref={ref}
                    adjustColor="#00fff2"
                    physics="map"
                    width={245.36}
                    depth={245.36}


                    scale={34.99}

                    x={9839.41}
                    y={-468.15}
                    z={-10828.57}

                    rotationX={-76.79}
                    rotationY={0.48}
                    rotationZ={-33.41}

                    src="maps/item/stargate.glb"
                    onClick={((e) => {
                        handleClick(e)
                    })}
                >

                </Model>


                <Trigger
                    name="triggerModel4"
                    targetIds="player"
                    radius={1434.65}

                    x={9839.41}
                    y={-468.15}
                    z={-10828.57}

                    interval={1}

                    onEnter={(() => {
                        handleOnPlayerFly()
                    })}
                    onExit={(() => {
                        handleOutPlayerFly()
                    })}
                />


                {/* <HTML
                    // ref={htmlRef}
                    visible={true}
                    x={-31.44}
                    y={-106.08}
                    z={927.94}
                >
                    <Box
                        sx={{
                            mt: 2,
                            padding: "30px",
                            height: "max-content",
                            color: "white",
                            borderRadius: "20px",
                            backdropFilter: "blur(4px)",
                            webkitBackdropFilter: "blur(4px)",
                            background: "rgba(0,0,0,0.7)",
                            border: "1px solid rgba(255,255,255,0.18)",
                            boxShadow: "0 8px 32px 0 rgba(31,38,135,0.37)",
                            '&:before': {
                                content: `" "`,
                                position: "absolute",
                                right: "30px",
                                top: "-15.55px",
                                borderTop: "none",
                                borderRight: "15px solid transparent",
                                borderLeft: "15px solid transparent",
                                borderBottom: "15px solid rgba(0,0,0,0.7)",
                            }
                        }}
                    >
                        <Typography variant="h6">
                            Travel to Japanese Island
                        </Typography>
                    </Box>
                </HTML> */}


            </Group>
        </>
    )

})


export default Portal