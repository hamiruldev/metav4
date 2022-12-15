import { AreaLight, PointLight } from 'lingo3d-react'
import React, { useRef } from 'react'


var dataLight = [
    {
        name: "light1",
        x: 1971.36,
        y: 128.27,
        z: 2128.95,
        rotationX: 46.66,
        rotationY: -0.71,
        rotationZ: -1.48,
        scale: 94.23,
        scaleX: 44.69,
        scaleY: 5.76,
        scaleZ: 0.0,
        intensity: 5,
        color: "#ffbd46"
    },
    {
        name: "light2",
        x: 1971.36,
        y: 128.27,
        z: -3935.31,
        rotationX: 152.50,
        rotationY: -0.71,
        rotationZ: -1.48,
        scale: 94.23,
        scaleX: 44.69,
        scaleY: 5.76,
        scaleZ: 0.0,
        intensity: 5,
        color: "#ffbd46"
    }

]

const LightArea2 = () => {

    return (
        <>
            <AreaLight
                name={dataLight[0].name}
                x={dataLight[0].x}
                y={dataLight[0].y}
                z={dataLight[0].z}
                rotationX={dataLight[0].rotationX}
                rotationY={dataLight[0].rotationY}
                rotationZ={dataLight[0].rotationZ}
                scale={dataLight[0].scale}
                scaleX={dataLight[0].scaleX}
                scaleY={dataLight[0].scaleY}
                scaleZ={dataLight[0].scaleZ}
                intensity={dataLight[0].intensity}
                color={dataLight[0].color}
            />

            <AreaLight
                name={dataLight[1].name}
                x={dataLight[1].x}
                y={dataLight[1].y}
                z={dataLight[1].z}
                rotationX={dataLight[1].rotationX}
                rotationY={dataLight[1].rotationY}
                rotationZ={dataLight[1].rotationZ}
                scale={dataLight[1].scale}
                scaleX={dataLight[1].scaleX}
                scaleY={dataLight[1].scaleY}
                scaleZ={dataLight[1].scaleZ}
                intensity={dataLight[1].intensity}
                color={dataLight[1].color}
            />
        </>
    )
}

export default LightArea2
