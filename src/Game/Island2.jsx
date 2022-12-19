import { createRef, Suspense, useRef, useState, forwardRef } from "react";

import { Button, Stack, useMediaQuery } from "@mui/material";

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
  Joystick,
  Trigger,
  AreaLight,
  Sphere,
  Circle,
  useScene,
  useAnimation,
  useRenderer,
  usePreload,
  FindAll,
  Water,
  Skybox,
} from "lingo3d-react";

import * as THREE from 'three'

import LightArea1 from "../component/World/LightArea1";
import LightArea2 from "../component/World/LightArea2";

import LoadingProgress from "../component/LoadingProgress";


const Island2 = () => {

  const viteBaseUrl = import.meta.env.VITE_BASE_URL;

  const { width, height } = useWindowSize();
  const scene = useScene()
  const getRenderer = useRenderer()


  const isMobile = width < height;
  const dummyRef = useRef(null);
  const dummyBatteryRef = useRef(null);
  const cameraRef = useRef(null);

  const portalRef = useRef(null);
  const triggerBatteryRef = useRef(null);
  const pointerRef = useRef(null);
  const worldMapRef = useRef(null);


  const [isGame, setGame] = useState(false);
  const [open, setOpen] = useState(false);

  const windowSize = useWindowSize();
  const matches = useMediaQuery("(max-width:599px)");
  const isInital = sessionStorage.getItem("inital");


  const progress = usePreload(
    [
      "maps/island_j-v2.glb",
      "3dCharacter/new/character1.glb",
      "3dCharacter/new/character2.glb",
      "3dCharacter/new/character3.glb",
      "3dCharacter/new/BreathingIdle.fbx",
      "3dCharacter/new/Running.fbx",
    ],
    "0.10mb"
  );


  const [running, setRunning] = useState(false);
  const [arrowPosition, setArrowPosition] = useState({ x: 0, y: 0, z: 0 });
  const [isVisible, setVisible] = useState({ state: false, name: "" });
  const [statePortal, setPortal] = useState(false)


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

  const handleGame = () => {
    setGame(true);
    isInital == null && sessionStorage.setItem("inital", true);
  };

  //player movement
  const handleClick = (e) => {

    const dummy = dummyRef.current;
    if (!dummy) return;

    const pointAnimation = pointerRef.current;
    if (!pointAnimation) return;

    setArrowPosition(e.point);

    pointAnimation.visible = true
    pointAnimation.bloom = true

    const animation = pointAnimation.animationManagers
    animation["Scene"].play()

    dummy.lookTo(e.point.x, undefined, e.point.z, 0.2);
    dummy.moveTo(e.point.x, undefined, e.point.z, 12);

    // active portal
    const animationPortal = dummy.animationManagers
    animationPortal["running"].play()

    dummy.onMoveToEnd = () => {
      animationPortal["idle"].play()
      pointAnimation.visible = false
    };
  };

  const movePlayer = (e, id) => {
    setVisible({ state: true, name: id });
    const dummy = dummyRef.current;

    setArrowPosition(e.point);

    !isMobile && dummy.lookTo(e.point.x, undefined, e.point.z + 200, 0.2);
    !isMobile && dummy.moveTo(e.point.x, undefined, e.point.z + 200, 12);
    !isMobile && setRunning(true);

    if (!isMobile) dummy.onMoveToEnd = () => {
      setRunning(false);
    };
  };

  const openPortal = (url) => {
    window.open(url, "_blank  ")
  }

  const handleItem = (name) => {
    const allChildren = scene.children
    const array1 = allChildren.filter(x => x.name == name)

    // active portal
    const animationPortal = portalRef.current.animationManagers
    animationPortal["Take 001"].play()
    portalRef.current.bloom = true

    //pass battery to player
    dummyBatteryRef.current.visible = true
    dummyBatteryRef.current.animation = {
      y: [80, 80 + 0.5, 80, 80 - 0.5, 80],
      rotationY: [0, 45, 90, 135, 180, 225, 270, 315]
    }


    //remove battery
    const MeshInModel = array1[0].children.filter(x => x.type != `Group` && x.name == 'batterySphere' || x.name == 'batteryModel')
    MeshInModel.map((item) => {
      item.children.filter(x => x.type == 'Mesh').map((item) => {
        item.material.dispose()
        item.geometry.dispose()
        item.parent.remove(item)
      })
    })

    scene.remove(array1[0])
    triggerBatteryRef.current.dispose();

  }



  if (progress < 100)
    // if the game is still loading

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          textAlign: "center",
          backgroundColor: "black",
          color: "white",
          width: "100vw",
        }}
      >
        <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
          <LoadingProgress value={Math.floor(progress)} />
        </Stack>
      </div>
    );

  return (
    <>
      {isInital == null && (
        <Button
          onClick={() => {
            handleGame();
            setOpen(true);
            // setAnimate(true);
          }}
          sx={{
            background: `url( ${windowSize.width < 700
              ? "preloader/popMobile.png"
              : "preloader/popDesktop.png"
              })`,
            width: "100%",
            height: "100vh",
            border: "0px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundColor: "black",
            zIndex: 10000,
            color: "black",
            display: isGame ? "none" : "block",
          }}
        />
      )}

      <World>
        {/* <LingoEditor /> */}
        {/* <Library /> */}
        {/* <Toolbar /> */}
        {/* <Editor /> */}
        {/* <Environment /> */}
        <Stats />
        <Setup
          pixelRatio={5}
          exposure={1}
          defaultLightScale={0.30}
          repulsion={5}
        />
        <Skybox texture="img/sky/autumn.jpg" />
        <Suspense fallback={null}>
          {/* <LightArea2 /> */}
        </Suspense>

        <Model
          ref={worldMapRef}
          name="worldmap"
          physics="map"
          width={245.36}
          depth={245.36}
          scaleX={20}
          scaleY={20}
          scaleZ={20}
          x={1722.20}
          y={-1646.54}
          z={-761.98}
          scale={70}
          flipY={true}
          src="maps/new/chinese_island5.glb"

          receiveShadow={true}

          onClick={!isMobile && handleClick}
        >

          <Find
            name="G-__555942.001"
            opacity={1}
          />
          <Find
            name="G-__555609"
            opacity={1}
          />

          <Find
            name="G-__555960"
            opacity={1}
          />

          <Find
            name="AM113_021_Populus_Defintion1.006"
            opacity={1}
            texture="maps/new/alphamap.png"
          />


          <Find
            name="tree"
            opacity={1}
            texture="maps/new/alphamap.png"
          />

          <FindAll name="tree" />


        </Model>

        <Water
          normalMap="maps/new/Water_NORM.jpg"
          x={-795.88}
          y={-20.89}
          z={-1858.29}
          rotationZ={-37.72}
          rotationX={-90.00}
        >

        </Water>


        <Group
          name="groupPortal"
          x={2028.42}
          y={233.00}
          z={-1404.01}
          rotationY={-164.79}
          rotationX={-31.42}
          rotationZ={-174.30}
          scale={0.30}
        >

          <AreaLight
            rotationX={177.94}
            scale={2}
            y={44.59}
            opacityFactor={10}
            intensity={50.00}
            color={"#0368ff"}
            visible={false}
          />

          <Trigger
            radius={400}
            targetIds="player"
            onEnter={(() => {
              openPortal(`${viteBaseUrl}`)
            })}
          />

          <Model
            name="portalModel"

            ref={portalRef}
            adjustColor="#00fff2"

            physics="map"
            width={245.36}
            depth={245.36}
            scaleX={10}
            scaleY={10}
            scaleZ={10}
            src="maps/stargate.glb"
            onClick={((e) => {
              handleClick(e)
            })}
          >

            <Find bloom={isMobile ? false : false} adjustColor="#00458f" name="Portal">
            </Find>
          </Model>
        </Group>


        <AreaLight
          name="batteryLight"
          x={-32.52}
          y={-1929.34}
          z={5372.94}
          rotationY={82.72}
        />


        <Group
          name="Battery"
          x={-263.36}
          y={167}
          z={-784.09}
          animation={{ y: [167, 167 + 10, 167, 167 - 10, 167], rotationY: [0, 45, 90, 135, 180, 225, 270, 315] }}
        >
          <Trigger
            ref={triggerBatteryRef}
            radius={100}
            name="triggerBattery"
            targetIds="player"
            onEnter={(() => {
              handleItem("Battery")
            })}
          />

          <Sphere
            name="batterySphere"
            scale={2.5}
            color="#ffa400"
            opacity={0.2}
            bloom
          />

          <Model
            name="batteryModel"
            src="item/coin.glb"
            bloom
            opacity={0.5}
            animationPaused={false}
            animationRepeat={false}
          />

        </Group>

        <ThirdPersonCamera
          ref={cameraRef}
          mouseControl={"drag"}
          active={true}
          lockTargetRotation={isMobile ? true : false}
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

            strideMove
            strideMode="free"
            src="3dCharacter/new/character1.glb"
            physics="character"
            animation={running ? "running" : "idle"}
            width={50}
            depth={50}

            // preset="rifle"
            rotationX={-180.00}
            rotationY={-0.74}
            rotationZ={-180.00}
            x={-404.36}
            y={91.93}
            z={194.50}
            scale={1.5}
          >
            <Model
              ref={dummyBatteryRef}
              name="dummyBattery"
              src="item/coin.glb"
              opacity={0.5}
              scale={0.2}
              // x={-0.82}
              y={80}
              // z={-10.98}
              visible={false}
            // animation={{ y: [80, 80 + 0.5, 80, 80 - 0.5, 80] }}

            />

            <AreaLight
              scale={0.20}
              rotationY={82.72}
              x={9.59}
              y={78.85}
              z={-9.10}
              helper={true}
            />

          </Dummy>

        </ThirdPersonCamera>

        <Model
          name="p2p"
          ref={pointerRef}
          src="dummy/p2p_a.glb"
          emissiveColor="#ff0000"
          color="#ff4e4e"
          opacity={1}
          scale={1}
          visible={false}
          x={arrowPosition.x}
          y={arrowPosition.y + 50}
          z={arrowPosition.z}
        />

      </World>

      {
        isMobile && (
          <Joystick
            onMove={(e) => {
              const fox = dummyRef.current;
              if (!fox) return;

              fox.strideForward = -e.y * 7;
              fox.strideRight = -e.x * 5;
            }}
            onMoveEnd={() => {
              const fox = dummyRef.current;
              if (!fox) return;

              fox.strideForward = 0;
              fox.strideRight = 0;
            }}
          />
        )
      }

    </>
  );
};

export default Island2;
