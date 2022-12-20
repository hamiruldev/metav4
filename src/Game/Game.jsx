import { Suspense, useEffect, useRef, useState } from "react";

import { Box, Button, Stack } from "@mui/material";

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
  Frame,
  useLoop,
  useValue,
  SvgMesh,
} from "lingo3d-react";

import * as THREE from 'three'

import LightArea from "../component/World/LightArea";
import ScrollDialog from "../component/ScrollDialog";

// import testVertexShader from '../shader/vertex.glsl'
// import testFragmentShader from '../shader/fragment.glsl'

const viteBaseUrl = import.meta.env.VITE_BASE_URL;

const Game = () => {

  const dummyRef = useRef(null);
  const dummyBatteryRef = useRef(null);
  const cameraRef = useRef(null);
  const pointerRef = useRef(null);
  const portalRef = useRef(null);
  const triggerBatteryRef = useRef(null);
  const worldRef = useRef(null);



  const scene = useScene()
  const { width, height } = useWindowSize();
  const getRenderer = useRenderer()
  const [running, setRunning] = useState(false);
  const [arrowPosition, setArrowPosition] = useState({ x: 0, y: 0, z: 0 });
  const [isVisible, setVisible] = useState({ state: false, name: "" });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [htmlFor, setHtmlFor] = useState();

  const isMobile = width < height;

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

    console.log("masuk")

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

  const handleClose = () => {
    setDialogOpen(false);
  };

  const animate = () => {
    const camera = scene.getObjectByName("camera");
    getRenderer.render(scene, camera.userData.manager.camera)
    window.requestAnimationFrame(animate)
  }

  // console.log("worldRef", worldRef?.current?.model?.object3d?.material)
  console.log("worldRef", worldRef?.current)

  return (
    <>
      <ScrollDialog
        htmlFor={htmlFor}
        boothState={undefined}
        dataContent={`Congrats! You can now play a game
        in the fantasy island. Go to future
        teleport at the end of this tunnel to
        explore the island.`}
        handleClose={handleClose}
        open={dialogOpen}
        onClose={handleClose}
      />
      <World>
        <LingoEditor />
        {/* <Library /> */}
        {/* <Toolbar /> */}
        {/* <Editor /> */}
        {/* <Environment /> */}
        {/* <Stats /> */}
        <Setup
          pixelRatio={5}
          exposure={1}
          defaultLightScale={0.30}
          repulsion={5}
        />

        <LightArea />

        <Model y={-2151.96} x={-3374.39} name="ground" src="maps/item/ground.glb" />

        <Model

          name="worldmap"
          physics="map"
          width={245.36}
          depth={245.36}
          scaleX={20}
          scaleY={20}
          scaleZ={20}
          x={0}
          y={0}
          z={0}
          scale={70}
          src="maps/tunnel/tunnel1.glb"
          onClick={!isMobile && handleClick}

          // textureFlipY={false}
          // alphaMap="maps/tunnel/Tunnel_diffuse.jpg"
          // texture="maps/tunnel/Tunnel_diffuse.jpg"

          ref={worldRef}
        >

          {/* <Find name="wall.001"
            alphaMap="maps/tunnel/Tunnel_diffuse.jpg"
            // texture="maps/tunnel/Tunnel_diffuse.jpg"
            normalMap="maps/tunnel/Tunnel_normal.jpg"
            roughnessMap="maps/tunnel/Tunnel_roughness.jpg"
            textureFlipY={false}
          /> */}

        </Model>

        <AreaLight
          x={474.83}
          y={-1698.09}
          z={-7039.36}
          rotationX={177.94}
          scale={3}
          opacityFactor={10}
          intensity={50.00}
          color={"#0368ff"}
          visible={false}
        />

        <Trigger
          x={313.71}
          y={-1710.77}
          z={-6915.49}
          radius={400}
          targetIds="player"
          onEnter={(() => {
            openPortal(`${viteBaseUrl}main-island`)
          })}
        />

        <SvgMesh
          name="arrowSvg"
          src="arrow.svg"
          bloom
          outline
          metalnessFactor={1}
          roughnessFactor={0.4}
          roughness={0.4}
          scaleZ={0.1}
          scaleX={1.50}
          scaleY={1.50}
          color="#ff0000"
          emissiveColor="#223056"
          x={280.38}
          z={-6561.98}
          y={-1657.27}
          animation={{ y: [-1657.27, -1657.27 + 20, -1657.27, -1657.27 - 20, -1657.27] }}

        />

        <Model
          name="portalModel"

          ref={portalRef}
          adjustColor="#00fff2"
          x={250.22}
          y={-1640.06}
          z={-6855.78}
          physics="map"
          width={245.36}
          depth={245.36}
          scaleX={10}
          scaleY={10}
          scaleZ={10}
          src="maps/item/stargate.glb"
          onClick={((e) => {
            handleClick(e)
          })}
        >

          <Find bloom={isMobile ? false : false} adjustColor="#00458f" name="Portal">
          </Find>

        </Model>

        <AreaLight
          name="batteryLight"
          x={-32.52}
          y={-1929.34}
          z={5372.94}
          rotationY={82.72}
        />

        <Group
          name="Battery"

          x={-123.60}
          y={-1926.92}
          z={5356.52}
          animation={{ y: [-1932.51, -1932.51 + 10, -1932.51, -1932.51 - 10, -1932.51], rotationY: [0, 45, 90, 135, 180, 225, 270, 315] }}

        >
          {/* <Trigger
            ref={triggerBatteryRef}
            radius={100}
            name="triggerBattery"
            targetIds="player"
            onEnter={(() => {
              handleItem("Battery")
            })}
          /> */}

          <Sphere
            ref={triggerBatteryRef}
            targetIds={['player']}
            onIntersect={(() => {
              handleItem("Battery")
            })}
            name="batterySphere"
            scale={2.5}
            color="#ffa400"
            opacity={0.3}
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
          name="camera"
          ref={cameraRef}
          mouseControl={"drag"}
          active={true}
          lockTargetRotation={isMobile ? true : false}
          fov={width < 640 ? 110 : 90}
          enableDamping

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

            rotationY={180.74}
            x={599.08}
            y={-2004.04}
            z={6631.41}
            scale={1.5}
          >
            <Model
              ref={dummyBatteryRef}
              name="dummyBattery"
              src="item/coin.glb"
              opacity={0.5}
              scale={0.2}
              y={80}
              visible={false}
              bloom

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


        {/*
         ***TV PANEL  difference Z = 1,518.1
         */}

        <Group y={-2079.95} name="tvscreengroup">
          <Plane
            name="tvkiri01"
            x={-410.94}
            y={191.46}
            z={6074.82}
            scaleX={5.73}
            scaleY={3.72}
            rotationY={20}
            videoTexture={
              isVisible?.state == true && isVisible?.name == "tvkiri01"
                ? "video/1SingaporeFoodFestival2022.mp4"
                : null
            }
            lightMap={
              isVisible?.state == false
                ? "img/1SingaporeFoodFestival2022.png"
                : "img/1SingaporeFoodFestival2022.png"
            }
            texture={
              isVisible?.state == false
                ? "img/1SingaporeFoodFestival2022.png"
                : "img/1SingaporeFoodFestival2022.png"
            }
            onClick={(e) => {
              movePlayer(e, "tvkiri01");
            }}
          // outline={mouseOver}
          // onMouseOver={() => setMouseOver(true)}
          // onMouseOut={() => setMouseOver(false)}
          >
            {
              /* {mouseOver && (
              <HTML>
                <div style={{ color: "white" }}>
                  <AnimText
                    style={{ fontWeight: "bold", fontSize: 22 }}
                    duration={1000}
                  >
                    Singapore Food Festival
                  </AnimText>
                </div>
              </HTML>
            )} */
            }
          </Plane>

          <Plane
            name="tvkiri02"
            x={-410.94}
            y={191.46}
            z={4554.72}
            scaleX={5.73}
            scaleY={3.72}
            rotationY={20}
            videoTexture={
              isVisible?.state == true && isVisible?.name == "tvkiri02"
                ? "video/3Iloomination.mp4"
                : null
            }
            lightMapIntensity={2}
            lightMap={
              isVisible?.state == false
                ? "img/3Iloomination.png"
                : "img/3Iloomination.png"
            }
            texture={
              isVisible?.state == false
                ? "img/3Iloomination.png"
                : "img/3Iloomination.png"
            }
            onClick={(e) => {
              movePlayer(e, "tvkiri02");
            }}
          />

          <Plane
            name="tvkiri03"
            x={-410.94}
            y={191.46}
            z={3029.62}
            scaleX={5.73}
            scaleY={3.72}
            rotationY={20}
            videoTexture={
              isVisible?.state == true && isVisible?.name == "tvkiri03"
                ? "video/5Curiography.mp4"
                : null
            }
            lightMapIntensity={1.5}
            lightMap={
              isVisible?.state == false
                ? "img/5Curiography.png"
                : "img/5Curiography.png"
            }
            texture={
              isVisible?.state == false
                ? "img/5Curiography.png"
                : "img/5Curiography.png"
            }
            onClick={(e) => {
              movePlayer(e, "tvkiri03");
            }}
          />

          <Plane
            name="tvkiri04"
            x={-410.94}
            y={191.46}
            z={1510.52}
            scaleX={5.73}
            scaleY={3.72}
            rotationY={20}
            videoTexture={
              isVisible?.state == true && isVisible?.name == "tvkiri04"
                ? "video/7StarPropertyAwards.mp4"
                : null
            }
            texture={
              isVisible?.state == false
                ? "img/7StarPropertyAwards.png"
                : "img/7StarPropertyAwards.png"
            }
            lightMapIntensity={1}
            lightMap={
              isVisible?.state == false
                ? "img/7StarPropertyAwards.png"
                : "img/7StarPropertyAwards.png"
            }
            onClick={(e) => {
              movePlayer(e, "tvkiri04");
            }}
          />

          <Plane
            name="tvkiri05"
            x={-410.94}
            y={191.46}
            z={162.42}
            scaleX={5.73}
            scaleY={3.72}
            rotationY={20}
            videoTexture={
              isVisible?.state == true && isVisible?.name == "tvkiri05"
                ? "video/9InternationalConference.mp4"
                : null
            }
            texture={
              isVisible?.state == false
                ? "img/9InternationalConference.png"
                : "img/9InternationalConference.png"
            }
            lightMapIntensity={1.5}
            lightMap={
              isVisible?.state == false
                ? "img/9InternationalConference.png"
                : "img/9InternationalConference.png"
            }
            onClick={(e) => {
              movePlayer(e, "tvkiri05");
            }}
          />

          <Plane
            name="tvkiri06"
            x={-410.94}
            y={191.46}
            z={-1360.49}
            scaleX={5.73}
            scaleY={3.72}
            rotationY={20}
            videoTexture={
              isVisible?.state == true && isVisible?.name == "tvkiri06"
                ? "video/11VirtualStationery.mp4"
                : null
            }
            texture={
              isVisible?.state == false
                ? "img/11VirtualStationery.png"
                : "img/11VirtualStationery.png"
            }
            lightMapIntensity={1}
            lightMap={
              isVisible?.state == false
                ? "img/11VirtualStationery.png"
                : "img/11VirtualStationery.png"
            }
            onClick={(e) => {
              movePlayer(e, "tvkiri06");
            }}
          />

          <Plane
            name="tvkiri07"
            x={-410.94}
            y={191.46}
            z={-2880.91}
            scaleX={5.73}
            scaleY={3.72}
            rotationY={20}
            videoTexture={
              isVisible?.state == true && isVisible?.name == "tvkiri07"
                ? "video/13VirtualPhotography.mp4"
                : null
            }
            texture={
              isVisible?.state == false
                ? "img/13VirtualPhotography.png"
                : "img/13VirtualPhotography.png"
            }
            lightMapIntensity={1.5}
            lightMap={
              isVisible?.state == false
                ? "img/13VirtualPhotography.png"
                : "img/13VirtualPhotography.png"
            }
            onClick={(e) => {
              movePlayer(e, "tvkiri07");
            }}
          />

          <Plane
            name="tvkiri08"
            x={-410.94}
            y={191.46}
            z={-4404.53}
            scaleX={5.73}
            scaleY={3.72}
            rotationY={20}
            videoTexture={
              isVisible?.state == true && isVisible?.name == "tvkiri08"
                ? "video/15HorizonSquare.mp4"
                : null
            }
            texture={
              isVisible?.state == false
                ? "img/15HorizonSquare.png"
                : "img/15HorizonSquare.png"
            }
            lightMapIntensity={1.5}
            lightMap={
              isVisible?.state == false
                ? "img/15HorizonSquare.png"
                : "img/15HorizonSquare.png"
            }
            onClick={(e) => {
              movePlayer(e, "tvkiri08");
            }}
          />

          <Plane
            name="tvkiri09"
            x={-410.94}
            y={191.46}
            z={-5923.44}
            scaleX={5.73}
            scaleY={3.72}
            rotationY={20}
            videoTexture={
              isVisible?.state == true && isVisible?.name == "tvkiri09"
                ? "video/17MemeBistroBar.mp4"
                : null
            }
            texture={
              isVisible?.state == false
                ? "img/17MemeBistroBar.png"
                : "img/17MemeBistroBar.png"
            }
            lightMapIntensity={2}
            lightMap={
              isVisible?.state == false
                ? "img/14VirtualAngelica.png"
                : "img/14VirtualAngelica.png"
            }
            onClick={(e) => {
              movePlayer(e, "tvkiri09");
            }}
          />

          <Plane
            name="tvkanan01"
            x={735.63}
            y={189.62}
            z={5315.74}
            scaleX={5.73}
            scaleY={3.72}
            rotationY={-19.7}
            videoTexture={
              isVisible?.state == true && isVisible?.name == "tvkanan01"
                ? "video/2VirtualPhD.mp4"
                : null
            }
            texture={
              isVisible?.state == false
                ? "img/2VirtualPhD.png"
                : "img/2VirtualPhD.png"
            }
            lightMapIntensity={2.5}
            lightMap={
              isVisible?.state == false
                ? "img/2VirtualPhD.png"
                : "img/2VirtualPhD.png"
            }
            onClick={(e) => {
              movePlayer(e, "tvkanan01");
            }}
          />

          <Plane
            name="tvkanan02"
            x={735.63}
            y={189.62}
            z={3795.46}
            scaleX={5.73}
            scaleY={3.72}
            rotationY={-20.0}
            videoTexture={
              isVisible?.state == true && isVisible?.name == "tvkanan02"
                ? "video/4BYD.mp4"
                : null
            }
            texture={
              isVisible?.state == false ? "img/4BYD.png" : "img/4BYD.png"
            }
            lightMapIntensity={1.2}
            lightMap={
              isVisible?.state == false ? "img/4BYD.png" : "img/4BYD.png"
            }
            onClick={(e) => {
              movePlayer(e, "tvkanan02");
            }}
          />

          <Plane
            name="tvkanan03"
            x={735.63}
            y={189.62}
            z={2270.09}
            scaleX={5.73}
            scaleY={3.72}
            rotationY={-20.0}
            videoTexture={
              isVisible?.state == true && isVisible?.name == "tvkanan03"
                ? "video/6Environmental.mp4"
                : null
            }
            texture={
              isVisible?.state == false
                ? "img/6Environmental.png"
                : "img/6Environmental.png"
            }
            lightMapIntensity={1.2}
            lightMap={
              isVisible?.state == false
                ? "img/6Environmental.png"
                : "img/6Environmental.png"
            }
            onClick={(e) => {
              movePlayer(e, "tvkanan03");
            }}
          />

          <Plane
            name="tvkanan04"
            x={735.63}
            y={189.62}
            z={751.29}
            scaleX={5.73}
            scaleY={3.72}
            rotationY={-20.0}
            videoTexture={
              isVisible?.state == true && isVisible?.name == "tvkanan04"
                ? "video/8SabahVirtualTravelFair.mp4"
                : null
            }
            texture={
              isVisible?.state == false
                ? "img/8SabahVirtualTravelFair.png"
                : "img/8SabahVirtualTravelFair.png"
            }
            color="#ec7c7c"
            lightMapIntensity={7.5}
            lightMap={"img/8SabahVirtualTravelFair.png"}
            onClick={(e) => {
              movePlayer(e, "tvkanan04");
            }}
          />

          <Plane
            name="tvkanan05"
            x={735.63}
            y={189.62}
            z={-598.72}
            scaleX={5.73}
            scaleY={3.72}
            rotationY={-20.0}
            videoTexture={
              isVisible?.state == true && isVisible?.name == "tvkanan05"
                ? "video/10VirtualSalesdrMCT.mp4"
                : null
            }
            texture={
              isVisible?.state == false
                ? "img/10VirtualSalesdrMCT.png"
                : "img/10VirtualSalesdrMCT.png"
            }
            lightMapIntensity={1.5}
            lightMap={
              isVisible?.state == false
                ? "img/10VirtualSalesdrMCT.png"
                : "img/10VirtualSalesdrMCT.png"
            }
            onClick={(e) => {
              movePlayer(e, "tvkanan05");
            }}
          />

          <Plane
            name="tvkanan06"
            x={730.40}
            y={189.62}
            z={-2119.39}
            scaleX={5.62}
            scaleY={3.72}
            rotationY={-20.0}
            // fog={false}
            // color="#cbffaf"

            videoTexture={
              isVisible?.state == true && isVisible?.name == "tvkanan06"
                ? "video/12EdenVirtualWorld.mp4"
                : null
            }
            texture={
              isVisible?.state == false
                ? "img/12EdenVirtualWorld.png"
                : "img/12EdenVirtualWorld.png"
            }
            lightMapIntensity={3}
            lightMap={
              isVisible?.state == false
                ? "img/14VirtualAngelica.png"
                : "img/14VirtualAngelica.png"
            }
            onClick={(e) => {
              movePlayer(e, "tvkanan06");
            }}
          />

          <Plane
            name="tvkanan07"
            x={735.63}
            y={189.62}
            z={-3639.65}
            scaleX={5.73}
            scaleY={3.72}
            rotationY={-20.0}
            videoTexture={
              isVisible?.state == true && isVisible?.name == "tvkanan07"
                ? "video/14VirtualAngelica.mp4"
                : null
            }
            texture={
              isVisible?.state == false
                ? "img/14VirtualAngelica.png"
                : "img/14VirtualAngelica.png"
            }
            lightMapIntensity={2}
            lightMap={
              isVisible?.state == false
                ? "img/14VirtualAngelica.png"
                : "img/14VirtualAngelica.png"
            }
            onClick={(e) => {
              movePlayer(e, "tvkanan07");
            }}
          />

          <Plane
            name="tvkanan08"
            x={735.63}
            y={189.62}
            z={-5162.1}
            scaleX={5.73}
            scaleY={3.72}
            rotationY={-20.0}
            videoTexture={
              isVisible?.state == true && isVisible?.name == "tvkanan08"
                ? "video/16VirtualBazaar.mp4"
                : null
            }
            texture={
              isVisible?.state == false
                ? "img/16VirtualBazaar.png"
                : "img/16VirtualBazaar.png"
            }
            lightMapIntensity={2}
            lightMap={
              isVisible?.state == false
                ? "img/14VirtualAngelica.png"
                : "img/14VirtualAngelica.png"
            }
            onClick={(e) => {
              movePlayer(e, "tvkanan08");
            }}
          />
        </Group>

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

export default Game;
