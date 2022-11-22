import { useLayoutEffect, useRef, useState } from "react";
import "./App.css";

import { Button, Stack, ThemeProvider } from "@mui/material";

import TouchAppTwoToneIcon from "@mui/icons-material/TouchAppTwoTone";

import PreLoader from "./component/PreLoader";
import ScrollDialog from "./component/ScrollDialog";
import LinearWithValueLabel from "./component/LinearWithValueLabel";
import AudioBcg from "./component/AudioBcg";
import PopInstruction from "./component/PopInstruction";

import {
  BrowserRouter,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";

import AllBooth from "./component/World/AllBooth";
import AddToCartButton from "./component/User/AddToCartButton";

import theme from "./style/theme";
import {
  Circle,
  DirectionalLight,
  Dummy,
  Cylinder,
  Torus,

  Find,
  Group,
  HTML,
  Model,
  Setup,
  Stats,
  SvgMesh,
  ThirdPersonCamera,
  Trigger,
  LingoEditor,
  usePreload,
  useSpring,
  useWindowSize,
  World,
} from "lingo3d-react";

import LightArea from "./component/World/LightArea";
import { panelObj } from "../public/dummy/dummy";



const Game = () => {
  const { width } = useWindowSize();
  const dummyRef = useRef(null);
  const npcRef = useRef(null);
  const boothRef = useRef(null);

  const [isInstruction, setInstruction] = useState();
  const [running, setRunning] = useState(false);
  const [arrowPosition, setArrowPosition] = useState({ x: 0, y: 0, z: 0 });
  const [mouseOver, setMouseOver] = useState(false);
  const [modalState, setModalState] = useState(false);

  const [addToCartData, setAddToCartData] = useState();

  const [boothState, setboothState] = useState({ id: 0 });
  const [modal, setModal] = useState(false);
  const [htmlFor, setHtmlFor] = useState();
  const [navBar, setNavBar] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const [positionPlayerX, setPositionPlayerX] = useState();
  const [positionPlayerZ, setPositionPlayerZ] = useState();

  const x = searchParams.get("x");
  const z = searchParams.get("z");

  const camX = mouseOver ? 50 : 70;
  const camY = mouseOver ? 90 : 90;
  const camZ = mouseOver ? 200 : 150;

  const xSpring = useSpring({ to: camX, bounce: 0 });
  const ySpring = useSpring({ to: camY, bounce: 0 });
  const zSpring = useSpring({ to: camZ, bounce: 0 });

  //player movement
  const handleClick = (e) => {
    const dummy = dummyRef.current;
    if (!dummy) return;

    setArrowPosition(e.point);
    dummy.lookTo(e.point.x, undefined, e.point.z, 0.1);
    dummy.moveTo(e.point.x, undefined, e.point.z, 14);
    setRunning(true);

    dummy.onMoveToEnd = () => {
      setRunning(false);
    };
  };

  //Modal control from child com Booth
  const sendDataToParentBooth = (index) => {
    if (index?.id != null) {
      setboothState(index);
    }

    if (index?.htmlFor == "navBar") {
      setboothState({ id: 0 });
      setHtmlFor("");

      setAddToCartData(index?.data);
      setNavBar(true);
    }

    setModal(true);
  };

  //modal logic
  useLayoutEffect(() => {
    if (modal && mouseOver) {
      const a = window.document.getElementById("modal");
      a?.click();

      setMouseOver(false);
    }

    if (!mouseOver) {
      setModal(false);
    }
  }, [modal, mouseOver]);

  // map player
  useLayoutEffect(() => {
    setPositionPlayerX(x);
    setPositionPlayerZ(z);
  }, [x, z]);


  return (
    <>
      <Stack
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          color: "white",
          margin: 2,
          zIndex: 1000,

          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: " center",
        }}
      >
        <AudioBcg />
        {/* <PopInstruction /> */}
        {/* <AddToCartButton sendDataToParent={sendDataToParentBooth} /> */}
      </Stack>

      <ScrollDialog
        setModalState={setModalState}
        boothState={boothState}
        dataContent={addToCartData}
        htmlFor={
          htmlFor == "video"
            ? "video"
            : boothState?.id > 0
              ? "booth"
              : navBar
                ? "navBar"
                : null
        }
      />

      <World>
        {/* <LingoEditor /> */}
        {/* <Library /> */}
        {/* <Toolbar /> */}
        {/* <Editor /> */}
        <Stats />
        <Setup
          defaultLightScale={false}
          pixelRatio={5}
        />

        <LightArea />
        <Model
          physics="map"
          width={245.36}
          depth={245.36}
          scaleX={20}
          scaleY={20}
          scaleZ={20}
          // y={2516.33}
          x={0}
          y={0}
          z={0}
          scale={70}
          src="maps/tunnel_baked.glb"
          animation="Object_48Action.002"
          onClick={handleClick}
        >

          {panelObj?.map((item, idTv) => {
            return (
              <>
                <Find
                  key={idTv}
                  name={item?.name}
                  bloom={item?.bloom}
                  // texture={item?.texture}
                  // texture={`${viteBaseUrl}/${item?.texture}`}
                  textureFlipY={item?.textureFlipY}
                  textureRotation={
                    item?.textureRotation
                  }
                  videoTexture={`/${item?.videoTexture}`}
                  color={item?.color}
                  emissiveColor="#626262"
                  emissiveIntensity={0.3}
                  onClick={(e) => {
                    movePlayer(e)
                  }}
                ></Find>
              </>
            )
          })}



          <Find bloom name="Line001" color="#ffffff" />

          <Find bloom name="Box050" color="#ffffff" />
          <Find bloom name="Box057" color="#ffffff" />

          <Find bloom name="ceilinglight" color="#ffffff" />

          <Find bloom name="Box050" color="#ffffff" />
          <Find bloom name="Box057" color="#ffffff" />
          <Find bloom name="Box058" color="#ffffff" />

        </Model>
        <ThirdPersonCamera
          mouseControl={modal && !mouseOver ? false : "drag"}
          active={modal ? false : true}
          lockTargetRotation={false}
          fov={width < 640 ? 110 : 90}
          enableDamping
          innerY={90}
          innerZ={150}
          innerX={70}
          y={100}
          // near={0.01}
          zoom={1}
        >
          <Dummy
            id="player"
            name="player"
            ref={dummyRef}
            scale={3.8}
            src="3dCharacter/new/character.fbx"
            physics="character"
            animations={{
              idle: "3dCharacter/new/BreathingIdle.fbx",
              running: "3dCharacter/new/Running.fbx",
            }}
            animation={running ? "running" : "idle"}
            width={50}
            depth={50}
            rotationY={69.74}

            x={0}
            y={0}
            z={0}
          />
          <DirectionalLight intensity={0.4} color="white"></DirectionalLight>
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
                bloom
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


      </World>
    </>
  );
};

const Loader = () => {
  const viteBaseUrl = import.meta.env.VITE_BASE_URL;
  const [isGameWorld, setGameWorld] = useState(false);
  const mobileVersion = window.matchMedia("(max-width: 425px)");
  const progress = usePreload(
    [
      "sky/sky4.glb",

      "booth/booth1.glb",
      "booth/booth2.glb",
      "booth/booth3.glb",

      "maps/tunnel_baked.glb",

      "npc/npc1.glb",

      "3dCharacter/back/character.fbx",
      "3dCharacter/back/BreathingIdle.fbx",
      "3dCharacter/back/Running.fbx",

      "skyBox/sky.jpg",
    ],
    300000
  );

  return (
    <>
      {progress < 100 && !isGameWorld && (
        <>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={"preloader/aloaderMobile.png"} />
            <LinearWithValueLabel valueItem={Math.round(progress)} />
          </Stack>
        </>
      )}

      {progress == 100 && !isGameWorld && (
        <>
          <Stack sx={{ alignItems: "center" }}>
            <img
              style={{
                position: "relative",
                left: "-1%",
                maxWidth: "100%",
                cursor: "pointer",
              }}
              onClick={() => {
                setGameWorld(true);
              }}
              src={
                mobileVersion
                  ? "preloader/preNoticMobile.png"
                  : "preloader/preNotic.png"
              }
            />
            <Button
              sx={{
                mt: 1,
                fontSize: "x-large",
                width: "initial",
              }}
              variant="contained"
              size="large"
              onClick={() => {
                setGameWorld(true);
              }}
            >
              Continue
            </Button>
          </Stack>
        </>
      )}

      {isGameWorld && (
        <>
          <BrowserRouter basename={`/${viteBaseUrl}`}>
            <div className="pt-20">
              <Routes>
                <Route path={`/`} element={<Game />} />
              </Routes>
            </div>
          </BrowserRouter>
        </>
      )}
    </>
  );
};

const App = () => {
  const [isDisableVideo, setVideo] = useState(false);
  const [isDisablePreLoader, setPreLoaderVideo] = useState(true);

  const hanldeVideo = () => {
    setVideo(true);
    setPreLoaderVideo(false);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <div
          className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen text-white bg-black"
          style={{ backgroundImage: `url(preloader/preloaderbg.jpg)` }}
        >
          {isDisablePreLoader ? (
            <PreLoader hanldeVideo={hanldeVideo} />
          ) : (
            isDisableVideo == true && <Loader />
          )}
        </div>
      </ThemeProvider>
    </>
  );
};

export default App;
