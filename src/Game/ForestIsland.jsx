import { Suspense, useEffect, useRef, useState } from "react";

import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";

import {
  Dummy,
  HTML,
  Find,
  Group,
  Model,
  Setup,
  Stats,
  ThirdPersonCamera,
  LingoEditor,
  useWindowSize,
  World,
  Joystick,
  Trigger,
  AreaLight,
  Sphere,
  useScene,
  useRenderer,
  Circle,
  Cube,
  Plane,
  Skybox,
  Camera,

} from "lingo3d-react";

import * as THREE from 'three'

import ScrollDialog from "../component/ScrollDialog";
import HtmlTxt from "../component/UiUx/HtmlTxt";

const viteBaseUrl = import.meta.env.VITE_BASE_URL;


const ForestIsland = () => {

  const dummyRef = useRef(null);
  const dummyBatteryRef = useRef(null);
  const cameraRef = useRef(null);
  const tpcRef = useRef(null);

  const pointerRef = useRef(null);
  const portalRef = useRef(null);
  const triggerBatteryRef = useRef(null);
  const worldRef = useRef(null);

  const scene = useScene()
  const getRenderer = useRenderer()
  const { width, height } = useWindowSize();
  const [isGame, setGame] = useState(true);
  const [arrowPosition, setArrowPosition] = useState({ x: 0, y: 0, z: 0 });

  const isInital = sessionStorage.getItem("inital");
  const isLogin = sessionStorage.getItem("login");

  isInital == null && sessionStorage.setItem("inital", false);
  isLogin == null && sessionStorage.setItem("login", false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [htmlFor, setHtmlFor] = useState();

  const isMobile = width < height;

  const handleInstructionClose = () => {
    setGame(false);
    setTimeout(() => {
      isLogin == "true" ? handleCamera() : handleDialogToggle("avatar")
    }, 1000);
  };

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
    window.open(` ${viteBaseUrl + url}`, "_self")
  }

  const handleItem = (name) => {

    name == "Battery" && handleDialogToggle("Info Board")

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

    // animate()
  }

  const handleDialogToggle = (name) => {
    setDialogOpen(!dialogOpen);
    setHtmlFor(name)
  };

  const openDialogToggle = (name) => {

    setDialogOpen(false);
    setTimeout(() => {
      if (isLogin == "false") {
        setDialogOpen(true);
        setHtmlFor(name)
      }
      else {
        setDialogOpen(false);
        setHtmlFor()
        handleCamera()
      };

    }, 500);
  };

  const handleClose = (id) => {
    id = "avatarClose" ? openDialogToggle("register") : setDialogOpen(false);
  };

  const handleOnPlayerFly = () => {


    const playerRefObj = dummyRef.current

    playerRefObj.animationManagers["float"].animationRepeat = true

    setTimeout(() => {
      playerRefObj.animationManagers["float"].play()
      playerRefObj.velocity.y = 1

    }, 1000);

    // playerRefObj.object3d.position.set(playerRefObj.x, Math.cos(time) * 0.2, playerRefObj.z)

    playerRefObj.onLoop = () => {
      if (playerRefObj.velocity.y === 0) {
        playerRefObj.onLoop = undefined
      }
    }

  }

  const handleOutPlayerFly = () => {
    // const playerRefObj = dummyRef.current
  }

  const handlePlayerFall = () => {

    const dummy = dummyRef.current;
    dummy.animationManagers["idle"].play()

    dummy.moveTo(-404.36, undefined, 194.50, 12);

    dummy.y = 238.87
    dummy.x = -404.36
    dummy.z = 194.50
  }

  const handleCamera = () => {
    setTimeout(() => {
      tpcRef.current.active = true
    }, 1000)
  }

  const animate = () => {
    const camera = scene.getObjectByName("camera");
    getRenderer.render(scene, camera.userData.manager.camera)
    window.requestAnimationFrame(animate)
  }

  const handleOnHtmlTxt = (idTxt) => {
    const htmlTextElm = document.getElementById(`htmlRef${idTxt}`)
    htmlTextElm.style.visibility = "visible"
  }

  const handleOffHtmlTxt = (idTxt) => {
    const htmlTextElm = document.getElementById(`htmlRef${idTxt}`)
    htmlTextElm.style.visibility = "hidden"
  }

  return (
    <>

      <ScrollDialog
        htmlFor={"welcome"}
        boothState={undefined}
        dataContent={`You are now in Fantasy Island.Choose your favourite avatar before start your exploration.`}
        open={isGame}
        handleClose={handleInstructionClose}
        onClose={handleInstructionClose}
      />

      {isInital &&
        <ScrollDialog
          htmlFor={htmlFor}
          boothState={undefined}
          dataContent={`You are now in Fantasy Island.Choose your favourite avatar before start your exploration.`}
          open={dialogOpen}
          handleClose={handleClose}
          onClose={handleClose}
        />
      }

      <World>

        {/* <LingoEditor /> */}
        {/* <Library /> */}
        {/* <Toolbar /> */}
        {/* <Editor /> */}
        {/* <Environment /> */}
        {/* <Stats /> */}

        <Setup
          ref={worldRef}
          pixelRatio={5}
          exposure={1}
          defaultLightScale={1}
          repulsion={5}
          gridHelper={true}
          antiAlias={true}
          receiveShadow={true}

        />


        <Skybox texture={`img/sky/sky1.jpg`} />

        <Plane
          id="plane"
          name="plane"
          visible={false}
          x={1412.35}
          y={-2633.30}
          z={-973.84}
          scale={80.00}
          rotationX={-90.00}
          intersectIds={["player"]}
          onIntersect={(() => {
            handlePlayerFall()
          })}
        />


        <Model
          name="worldmap"
          physics="map"
          width={245.36}
          depth={245.36}
          scaleX={20}
          scaleY={20}
          scaleZ={20}
          x={1722.20}
          y={-1083.90}
          z={-486.53}
          scale={70}
          // src={`maps/forest/Grassland.glb`}
          src={`maps/forest/forest_island.glb`}
          onClick={!isMobile && handleClick}
          receiveShadow={true}


        >
          <Find name="AM113_045_Pinus_Defintion.010"
            texture={`maps/forest/new/forest_island_img6.png`}
            textureFlipY={false}
            opacity={0.9}
          />

          <Find name="AM113_061_Aesculus_Glabra_Defintion1"
            texture={`maps/forest/new/forest_island_img7.png`}
            textureFlipY={false}
            opacity={0.9}
          />

          <Find name="water.001" />
          <Find name="mountain" />


        </Model>

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
            radius={400}
            targetIds="player"
            onEnter={(() => {
              openPortal(`main-island`)
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
            src={`maps/item/stargate.glb`}
            onClick={((e) => {
              handleClick(e)
            })}
          >
            <Find bloom={isMobile ? false : false} adjustColor="#00458f" name="Portal">
            </Find>
            <HtmlTxt text={"Travel to Main Island"} url={''} id="main-island" />

          </Model>


          <Cube
            name="triggerMainHtml"
            intersectIds={["player"]}
            color="red"

            opacity={0.1}

            visible={false}

            x={587.39}
            y={-187.98}
            z={923.22}

            scale={31.00}

            onIntersect={(() => {
              handleOnHtmlTxt("main-island")
            })}

            onIntersectOut={(() => {
              handleOffHtmlTxt("main-island")
            })}
          />



        </Group>

        <AreaLight
          name="batteryLight"
          x={0}
          y={0}
          z={0}
          rotationY={82.72}
        />

        <Group
          name="Battery"
          x={-657.85}
          y={247.94}
          z={0}

        >
          <Trigger
            ref={triggerBatteryRef}
            radius={150}
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
            opacity={0.3}
          />

          <Model
            name="batteryModel"
            src={`item/coin.glb`}
            bloom
            animation={{ rotationY: [0, 45, 90, 135, 180, 225, 270, 315] }}
            opacity={0.5}
            animationPaused={false}
            animationRepeat={false}

          />

        </Group>

        <Camera
          name="cameraRef"
          active={true}
          ref={cameraRef}
          transition={0.02}
          innerZ={223.68}
          x={-401.57}
          y={803.95}
          z={3891.64}
          rotationY={-10.78}

        />

        <ThirdPersonCamera
          ref={tpcRef}
          name="tpc"
          mouseControl={"drag"}
          active={false}
          lockTargetRotation={isMobile ? true : false}
          fov={width < 640 ? 110 : 90}
          enableDamping

          transition={0.009}
          innerZ={223.68}

          enableZoom
          minPolarAngle={100}


          y={100}
          innerY={50}
          zoom={1}
        >

          <Dummy
            id="player"
            name="player"
            ref={dummyRef}

            strideMove
            strideMode="free"
            src={`3dCharacter/new/character1.glb`}
            physics="character"
            animations={{ float: `3dCharacter/new/Floating.fbx` }}

            width={50}
            depth={50}

            mass={1}
            receiveShadow={true}
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
              src={`item/coin.glb`}
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
          src={`dummy/p2p_a.glb`}
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

export default ForestIsland;
