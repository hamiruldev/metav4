import { Suspense, useRef, useState } from "react";

import { Button, Stack } from "@mui/material";

import {
  Dummy,
  HTML,
  Cylinder,
  Torus,
  Find,
  Group,
  Model,
  Setup,
  Stats,
  ThirdPersonCamera,
  LingoEditor,
  useWindowSize,
  World,
  Plane,
  Cube,
  useSpring,
  PointLight,
} from "lingo3d-react";

import LightArea from "../component/World/LightArea";
import AnimText from "@lincode/react-anim-text";

const Island = () => {
  const { width } = useWindowSize();
  const dummyRef = useRef(null);
  const [running, setRunning] = useState(false);
  const [arrowPosition, setArrowPosition] = useState({ x: 0, y: 0, z: 0 });
  const [isVisible, setVisible] = useState({ state: false, name: "" });

  //mouseOver
  const [mouseOver, setMouseOver] = useState(false);

  const camX = mouseOver ? 50 : 0;
  const camY = mouseOver ? 100 : 100;
  const camZ = mouseOver ? 100 : 300;

  // Camera spring animation
  // 相机的弹簧动画
  const xSpring = useSpring({ to: camX, bounce: 0 });
  const ySpring = useSpring({ to: camY, bounce: 0 });
  const zSpring = useSpring({ to: camZ, bounce: 0 });

  const viteBaseUrl = import.meta.env.VITE_BASE_URL;

  //player movement
  const handleClick = (e) => {
    const dummy = dummyRef.current;
    if (!dummy) return;

    setArrowPosition(e.point);
    dummy.lookTo(e.point.x, undefined, e.point.z, 0.2);
    dummy.moveTo(e.point.x, undefined, e.point.z, 8);
    setRunning(true);

    dummy.onMoveToEnd = () => {
      setRunning(false);
    };
  };

  const movePlayer = (e, id) => {
    setVisible({ state: true, name: id });
    const dummy = dummyRef.current;
    // if (!dummy) return;

    setArrowPosition(e.point);
    dummy.lookTo(e.point.x, undefined, e.point.z + 200, 0.2);
    dummy.moveTo(e.point.x, undefined, e.point.z + 200, 12);
    setRunning(true);

    dummy.onMoveToEnd = () => {
      setRunning(false);
    };
  };

  return (
    <>
      <World>
        {/* <LingoEditor /> */}
        {/* <Library /> */}
        {/* <Toolbar /> */}
        {/* <Editor /> */}
        {/* <Environment /> */}
        {/* <Stats /> */}
        <Setup
          pixelRatio={5}
          exposure={1}
          defaultLightScale={0.55}
          repulsion={5}
        />

        <LightArea />

        <Model
          physics="map"
          width={245.36}
          depth={245.36}
          scaleX={20}
          scaleY={20}
          scaleZ={20}
          x={0}
          y={0}
          z={0}
          scale={180}
          src="maps/art_gallery.glb"
          onClick={handleClick}
        ></Model>


        <ThirdPersonCamera
          mouseControl={"drag"}
          active={true}
          lockTargetRotation={false}
          fov={width < 640 ? 110 : 90}
          enableDamping
          // innerY={90}

          // Basiir
          innerY={ySpring}
          innerZ={zSpring}
          innerX={xSpring}
          // --Basiir
          y={100}
          zoom={1}
        >
          <Dummy
            id="player"
            name="player"
            ref={dummyRef}
            scale={1}
            src="3dCharacter/new/character.glb"
            physics="character"
            animation={running ? "running" : "idle"}
            width={50}
            depth={50}
            rotationY={180.74}
            x={0}
            y={120}
            z={170}
          />
        </ThirdPersonCamera>

        {running && (
          <>
            <Group>
              <Torus
                x={arrowPosition.x}
                y={arrowPosition.y + 10}
                z={arrowPosition.z}
                height={100}
                depth={100}
                width={72.99}
                emissiveColor="#ff0000"
                color="#ff4e4e"
                rotationX={90}
                animation={{
                  scale: [0, 1, 1, 0],
                }}
                scaleX={0.21}
                scaleY={0.24}
                scaleZ={0.13}
                normalScale={{ x: 1, y: 1 }}
              />
              <Torus
                x={arrowPosition.x}
                y={arrowPosition.y + 10}
                z={arrowPosition.z}
                height={100}
                depth={100}
                width={72.99}
                emissiveColor="#ff0000"
                color="#ff4e4e"
                rotationX={90}
                animation={{
                  scale: [0, 1, 1, 0],
                }}
                scaleX={0.5}
                scaleY={0.5}
                scaleZ={1.64}
                normalScale={{ x: 1, y: 1 }}
              />
              <Cylinder
                x={arrowPosition.x}
                y={arrowPosition.y + 10}
                z={arrowPosition.z}
                height={200}
                width={72.99}
                depth={100}
                emissiveColor="#ff0000"
                color="#ff4e4e"
                animation={{
                  scale: [0, 0.09, 0.05, 0],
                }}
                scaleX={0.02}
                scaleY={0.46}
                scaleZ={0.03}
                normalScale={{ x: 1, y: 1 }}
              />
            </Group>
          </>
        )}

        {/*
         ***TV PANEL  difference Z = 1,518.1
         */}
      </World>
    </>
  );
};

export default Island;
