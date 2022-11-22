import { AreaLight, PointLight } from 'lingo3d-react'
import React from 'react'

const LightArea = () => {
    return (
        <>


            <AreaLight
                name="light1"
                x={215.01}
                y={-2001.21}
                z={-7180.17}
                rotationX={46.66}
                rotationY={-0.71}
                rotationZ={-1.48}
                scale={94.23}
                scaleX={44.69}
                scaleY={5.76}
                scaleZ={0.0}
                intensity={5}
                color="#ffbd46"
            />

            <AreaLight
                name="light2"
                x={215.01}
                y={-1982.15}
                z={7308.24}
                rotationX={158.79}
                rotationY={-0.93}
                rotationZ={-0.90}
                scale={94.23}
                scaleX={44.69}
                scaleY={5.76}
                scaleZ={0.0}
                intensity={5}
                color="#ffbd46"
            />


            {/* <AreaLight
                name="light2"
                x={-1812.64}
                y={-1649.56}
                z={-1473.34}
                rotationX={89.93}
                rotationY={51.55}
                rotationZ={-89.36}
                scale={94.23}
                scaleX={94.23}
                scaleY={7.74}
                scaleZ={0.0}
                intensity={5}
                color="#ffbd46"
            />

            <AreaLight
                name="light3"
                x={2062.79}
                y={-1649.56}
                z={-1473.34}
                rotationX={89.93}
                rotationY={-51.55}
                rotationZ={-89.36}
                scale={94.23}
                scaleX={94.23}
                scaleY={18.50}
                scaleZ={0.0}
                intensity={5}
                color="#ffbd46"
            /> */}
        </>
    )
}

export default LightArea
