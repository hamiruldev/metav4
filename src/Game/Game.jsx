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
  Joystick,
  Trigger,
  AreaLight,
} from "lingo3d-react";

import LightArea from "../component/World/LightArea";
import AnimText from "@lincode/react-anim-text";

const Game = () => {
  const { width, height } = useWindowSize();

  const isMobile = width < height;
  const dummyRef = useRef(null);
  const portalRef = useRef(null);

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
    dummy.moveTo(e.point.x, undefined, e.point.z, 12);
    setRunning(true);

    dummy.onMoveToEnd = () => {
      setRunning(false);
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

  return (
    <>
      <Stats />
      <World>
        {/* <LingoEditor /> */}
        {/* <Library /> */}
        {/* <Toolbar /> */}
        {/* <Editor /> */}
        {/* <Environment /> */}

        <Setup
          pixelRatio={5}
          exposure={1}
          defaultLightScale={0.2}
          repulsion={5}
        />

        <LightArea />

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
          src="maps/tunnel1.glb"
          // src="maps/tunnel-v3.glb"

          onClick={!isMobile && handleClick}
        ></Model>

        {/* <Model
          physics="map"
          width={245.36}
          depth={245.36}
          scaleX={20}
          scaleY={20}
          scaleZ={20}
          x={0}
          y={0}
          z={0}
          scale={10}
          src="maps/art_gallery.glb"
          onClick={handleClick}
        ></Model> */}

        <Trigger
          x={313.71}
          y={-1710.77}
          z={-6915.49}
          radius={400}
          targetIds="player"
          onEnter={(() => {
            openPortal('https://www.i-smart.com.sg/contact-us')
          })}
        />

        <AreaLight
          x={474.83}
          y={-1698.09}
          z={-7039.36}
          rotationX={177.94}
          scale={3}
          opacityFactor={10}
          intensity={50.00}
          color={"#0368ff"}
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
          src="maps/stargate.glb"
          animation={"Take 001"}
          onClick={((e) => {
            handleClick(e)
          })}
        >
          <Find bloom={isMobile ? false : true} adjustColor="#00458f" name="Portal">
          </Find>
        </Model>

        <ThirdPersonCamera
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

            scale={1.5}
            src="3dCharacter/new/character.glb"
            physics="character"
            animation={running ? "running" : "idle"}
            width={50}
            depth={50}
            rotationY={180.74}
            x={108.52}
            y={-2004.04}
            z={6631.41}
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
      </World>

      {isMobile && (
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
      )}

    </>
  );
};

export default Game;
