import { useRef, useState } from "react";

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
  usePreload,
  useTimer,
} from "lingo3d-react";

import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

import LightArea1 from "../component/World/LightArea1";
import LoadingProgress from "../component/LoadingProgress";


const Island1 = () => {
  const { width, height } = useWindowSize();
  const scene = useScene()

  const player = scene.getObjectByName("player")

  const viteBaseUrl = import.meta.env.VITE_BASE_URL;


  const isMobile = width < height;
  const dummyRef = useRef(null);
  const dummyBatteryRef = useRef(null);
  const cameraRef = useRef(null);

  const portalRef = useRef(null);
  const triggerBatteryRef = useRef(null);
  const groupBatteryRef = useRef(null);
  const pointerRef = useRef(null);

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
  const [dialogOpen, setDialogOpen] = useState(false);

  const [playerAnimation, setPlayerAnimation] = useState("idle");
  const [arrowPosition, setArrowPosition] = useState({ x: 0, y: 0, z: 0 });

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
    dummyBatteryRef.current.animation = { y: [80, 80 + 0.5, 80, 80 - 0.5, 80] }

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


  const handleOnPlayerFly = () => {

    const clock = new THREE.Clock();
    const time = clock.getElapsedTime();

    const playerRefObj = dummyRef.current

    console.log("time", time)


    setTimeout(() => {


      playerRefObj.animationManagers["float"].animationRepeat = true
      playerRefObj.animationManagers["float"].play()



      playerRefObj.velocity.y = 5
      playerRefObj.positionUpdate.x = true
      playerRefObj.positionUpdate.y = true
      playerRefObj.positionUpdate.z = true

      playerRefObj.object3d.position.set(playerRefObj.x, Math.cos(time) * 0.2, playerRefObj.z)

      playerRefObj.onLoop = () => {
        if (playerRefObj.velocity.y === 0) {
          playerRefObj.onLoop = undefined
        }
      }

    }, 1000);


  }


  const handleOutPlayerFly = () => {

    // const playerRefObj = dummyRef.current

  }

  const handleDialogToggle = (name) => {
    setDialogOpen(!dialogOpen);
    setHtmlFor(name)
  };



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

        <LightArea1 />

        <Model
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
          src="maps/island_n-v1.glb"
          onClick={!isMobile && handleClick}
        ></Model>

        <Group
          name="groupPortal"
          x={2168.09}
          y={206.86}
          z={-1404.01}
          rotationY={-31.42}
          rotationX={-164.79}
          rotationZ={-174.30}
          scale={0.30}
        >

          <AreaLight
            rotationX={177.94}
            scale={2}
            opacityFactor={10}
            intensity={50.00}
            color={"#0368ff"}
            visible={false}

          />

          <Trigger
            radius={600}
            targetIds="player"
            onEnter={(() => {
              openPortal(`${viteBaseUrl}japan-island`)
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

        <Group
          name="Battery"
          ref={groupBatteryRef}
          x={755.59}
          z={-1960.69}
          animation={{ y: [120.35, 120.35 + 2, 120.35, 120.35 - 2, 120.35] }}
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
            color="#457ffb"
            opacity={0.1}
            bloom
          />

          <Model
            name="batteryModel"
            src="item/battery.glb"
            // bloom
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
            // animation={running ? "float" : "float"}
            animations={{ float: "3dCharacter/new/Floating.fbx" }}

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
              src="item/battery.glb"
              opacity={0.5}
              scale={0.2}
              y={80}
              visible={false}
            />

          </Dummy>

        </ThirdPersonCamera>

        <Model
          name="p2p"
          ref={pointerRef}
          src="dummy/p2p_a.glb"
          emissiveColor="#ff0000"
          color="#ffffff"
          opacityFactor={4}
          scale={1}
          animation={{ rotationY: [0, 45, 90, 180, 270, 360] }}
          visible={false}
          x={arrowPosition.x}
          y={arrowPosition.y + 50}
          z={arrowPosition.z}
        />


        <Group
          x={-952.22}
          y={0.20}
          z={-440.27}
        >
          <Circle
            rotationX={270}
            scale={2.87}
            opacity={0.50}
          />

          <Trigger
            pad
            targetIds={"player"}
            radius={150.00}

            onEnter={(() => {
              handleOnPlayerFly()
            })}

            onExit={(() => {
              handleOutPlayerFly()
            })}

          />
        </Group>


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

export default Island1;
