import { AreaLight, PointLight, useScene } from 'lingo3d-react'
import React from 'react'
import { useRef } from 'react'

import * as THREE from 'three'


const LightArea1 = () => {

    // const refLight = useRef(null)
    // const scene = useScene()
    // console.log("refLight", refLight.current)
    // setTimeout(() => {
    //     const light2 = refLight?.current?.object3d
    //     console.log("light2", light2)
    //     light2.clone()
    //     scene.add(light2)
    // }, 5000);
    // var originalLight = new THREE.RectAreaLight(0xffffff, 1, 1, 1);
    // console.log("originalLight", originalLight)
    // reflight !== null && light2?.copy()

    console.log("rerender")

    return (
        <>


            <AreaLight
                name="light1"
                x={1971.36}
                y={128.27}
                z={2128.95}
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
                x={1971.36}
                y={128.27}
                z={2203.81}
                rotationX={23.88}
                rotationY={-0.71}
                rotationZ={-1.48}
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

export default LightArea1
