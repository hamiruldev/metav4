import { createRef, forwardRef, useRef, useState } from "react";

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
  Cube,
  Plane,
  Skybox,
  OrbitCamera,
  Camera,
  DirectionalLight,
  Environment,
} from "lingo3d-react";

import * as THREE from 'three'

import ScrollDialog from "../component/ScrollDialog";
import HtmlTxt from "../component/UiUx/HtmlTxt";

const viteBaseUrl = import.meta.env.VITE_BASE_URL;

const MainIsland = () => {

  const dummyRef = useRef(null);
  const dummyBatteryRef = useRef(null);
  const cameraRef = useRef(null);
  const tpcRef = useRef(null);
  const pointerRef = useRef(null);
  const portalRef = createRef(null);
  const triggerBatteryRef = useRef(null);
  const worldRef = useRef(null);
  const htmlRef = useRef(null);

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

  const openPortal = (url) => {
    window.open(` ${viteBaseUrl + url}`, "_self")
  };

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

  const handleItem = (name) => {

    name == "Battery" && handleDialogToggle("coin Collected")

    const allChildren = scene.children
    const array1 = allChildren.filter(x => x.name == name)

    // active portal
    // const animationPortal = portalRef.current.animationManagers
    // animationPortal["Take 001"].play()
    // portalRef.current.bloom = true

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
  };

  const handleDialogToggle = (name) => {
    setDialogOpen(!dialogOpen);
    setHtmlFor(name)
  };

  const openDialogToggle = (name) => {

    setTimeout(() => {
      if (isLogin == "false") {
        setDialogOpen(true);
        setHtmlFor("register")
      }
      else {
        setDialogOpen(false);
        setHtmlFor()
        handleCamera()
      };

    }, 500);
  };

  const handleClose = (id) => {
    setDialogOpen(false);
  };

  const handleOnPlayerFly = (url) => {

    const playerRefObj = dummyRef.current

    playerRefObj.animationManagers["float"].animationRepeat = true

    setTimeout(() => {
      playerRefObj.animationManagers["float"].play()
      playerRefObj.velocity.y = 1


      setTimeout(() => {
        openPortal(url)
      }, 1000);

    }, 1000);

    // playerRefObj.object3d.position.set(playerRefObj.x, Math.cos(time) * 0.2, playerRefObj.z)

    playerRefObj.onLoop = () => {
      if (playerRefObj.velocity.y === 0) {
        playerRefObj.onLoop = undefined
      }
    }

  };

  const handleOutPlayerFly = () => {
    console.log("keluar")
    // const playerRefObj = dummyRef.current
  };

  const handlePlayerFall = () => {

    const dummy = dummyRef.current;
    dummy.animationManagers["idle"].play()

    dummy.moveTo(-169.30, undefined, -96.23, 12);

    dummy.y = -356.15
    dummy.x = -169.30
    dummy.z = -96.23
  };

  const handleOnHtmlTxt = (idTxt) => {
    const htmlTextElm = document.getElementById(`htmlRef${idTxt}`)
    htmlTextElm.style.visibility = "visible"
    setTimeout(() => {
      htmlTextElm.style.visibility = "hidden"
    }, 2500);
  }

  const handleOffHtmlTxt = (idTxt) => {
    const htmlTextElm = document.getElementById(`htmlRef${idTxt}`)
    htmlTextElm.style.visibility = "hidden"
  }

  const handleCamera = () => {
    setTimeout(() => {
      tpcRef.current.active = true
    }, 1000)
  };

  const animate = () => {
    const camera = scene.getObjectByName("tpc");
    getRenderer.render(scene, camera.userData?.manager?.camera)
    window.requestAnimationFrame(animate)
  };

  const tree = () => {

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);

    const groupPortal1 = scene.getObjectByName("groupPortal")
    const Battery = scene.getObjectByName("Battery")
    const cubeLingo = scene.getObjectByName("cube")

    const cubeLingo1 = Object.getOwnPropertyDescriptors(cubeLingo);

    // cubeLingo1.userData = {}
    // cubeLingo1.parent = null
    // cubeLingo1.children = []
    // const copyCube = cubeLingo1.clone(true)
    // copyCube.name = "copyCube"
    // copyCube.position.set(-169.30, -680.33, -509.88)
    // scene.add(copyCube);
    // console.log("cube", cube)
    // console.log("copyCube", copyCube)

    console.log("cubeLingo1", cubeLingo1)

  };

  const handleMenu = () => {
    setDialogOpen(true);
    setHtmlFor("menu")
  }

  const handleMap = () => {
    setDialogOpen(true);
    setHtmlFor("map")
  }

  const handleRegister = () => {
    openDialogToggle("register")
  }



  return (
    <>

      <Stack
        sx={{
          position: "relative",
          float: "right",
        }}
      >
        <Button id="RegisterButton"
          sx={{ display: "none" }}
          onClick={handleRegister}

          className="listButtonMenu ButtonStandard">
          Register
        </Button>

        <Button
          id="cameraButton"
          sx={{ display: "none" }}
          onClick={handleCamera} className="listButtonMenu ButtonStandard">
          Camera
        </Button>

        <Button onClick={handleMenu} className="listButtonMenu ButtonStandard">
          menu
        </Button>

        <Button onClick={handleMap} className="listButtonMenu ButtonStandard">
          map
        </Button>
      </Stack>


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
          dataContent={`You are now in Fantasy Island. Choose your favourite avatar before start your exploration.`}
          open={dialogOpen}
          handleClose={handleClose}
          onClose={handleClose}
        />
      }

      <World >

        {/* <LingoEditor /> */}
        {/* <Library /> */}
        {/* <Toolbar /> */}
        {/* <Editor /> */}
        {/* <Stats /> */}


        <Setup
          ref={worldRef}
          pixelRatio={5}
          exposure={1}
          defaultLightScale={0.7}
          repulsion={5}
          gridHelper={false}
          antiAlias={true}

        />

        <Skybox texture="img/sky/sky1.jpg" />

        <Model
          name="worldmap"
          physics="map"
          width={245.36}
          depth={245.36}
          scaleX={20}
          scaleY={20}
          scaleZ={20}
          x={1722.20}
          z={-761.98}
          src="maps/main/main_island.glb"
          onClick={!isMobile && handleClick}
        >
        </Model>


        <Group
          ref={portalRef}
          nameId="groupPortal"
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

          <Model
            name="portalJapan"
            adjustColor="#00fff2"
            physics="map"
            width={245.36}
            depth={245.36}

            scale={34.99}

            x={13475.40}
            y={-3747.40}
            z={4060.09}

            rotationX={-77.31}
            rotationY={-2.72}
            rotationZ={-124.30}

            src="maps/item/stargate.glb"
            onClick={((e) => {
              handleClick(e)
            })}
          >
            <HtmlTxt ref={htmlRef} text={"Travel to Japan Island"} url={''} id="japan-island" />
          </Model>

          <Trigger
            name="triggerJapan"
            targetIds="player"
            radius={800}

            x={13475.40}
            y={-3747.40}
            z={4060.09}

            interval={1}

            onEnter={(() => {
              handleOnPlayerFly("japan-island")
            })}
            onExit={(() => {
              handleOutPlayerFly()
            })}
          />


          <Cube
            name="triggerJapanHtml"
            intersectIds={["player"]}
            color="red"

            rotationX={-166.00}
            rotationY={32.00}
            rotationZ={-3.00}

            opacity={0.1}

            visible={false}

            x={13475.40}
            y={-3747.40}
            z={4060.09}

            scale={100.00}

            onIntersect={(() => {
              handleOnHtmlTxt("japan-island")
            })}

            onIntersectOut={(() => {
              handleOffHtmlTxt("japan-island")
            })}
          />

          <Model

            name="portalChina"
            adjustColor="#00fff2"
            physics="map"
            width={245.36}
            depth={245.36}

            scale={34.99}

            x={-1703.08}
            y={-5032.29}
            z={6898.37}

            rotationX={-79.42}
            rotationY={-0.43}
            rotationZ={144.73}

            src="maps/item/stargate.glb"
            onClick={((e) => {
              handleClick(e)
            })}
          >
            <HtmlTxt text={"Travel to China Island"} url={''} id="china-island" />

          </Model>

          <Trigger
            name="triggerChina"
            targetIds="player"
            radius={800}

            x={-1707.08}
            y={-5089.14}
            z={6920.60}


            interval={1}

            onEnter={(() => {
              handleOnPlayerFly("chinese-island")
            })}
            onExit={(() => {
              handleOutPlayerFly()
            })}
          />

          <Cube
            name="triggerChinaHtml"
            intersectIds={["player"]}
            color="red"

            rotationX={-166.00}
            rotationY={32.00}
            rotationZ={-3.00}

            opacity={0.1}

            visible={false}

            x={-1707.08}
            y={-5089.14}
            z={6920.60}

            scale={100.00}

            onIntersect={(() => {
              handleOnHtmlTxt("china-island")
            })}

            onIntersectOut={(() => {
              handleOffHtmlTxt("china-island")
            })}
          />

          <Model
            name="portalGreek"

            adjustColor="#00fff2"
            physics="map"
            width={245.36}
            depth={245.36}

            scale={34.99}


            x={-5328.97}
            y={-1881.58}
            z={-7548.52}

            rotationX={-75.44}
            rotationY={-1.45}
            rotationZ={56.76}

            src="maps/item/stargate.glb"
            onClick={((e) => {
              handleClick(e)
            })}
          >

            <HtmlTxt text={"Travel to Greek Island"} url={''} id="greek-island" />

          </Model>

          <Trigger
            name="triggerGreek"
            targetIds="player"
            radius={800}

            x={-5559.07}
            y={-1836.57}
            z={-7679.60}

            interval={1}

            onEnter={(() => {
              handleOnPlayerFly("greek-island")
            })}
            onExit={(() => {
              handleOutPlayerFly()
            })}
          />

          <Cube
            name="triggerGreekHtml"
            intersectIds={["player"]}
            color="red"

            rotationX={-166.00}
            rotationY={32.00}
            rotationZ={-3.00}

            opacity={0.1}

            visible={false}

            x={-5559.07}
            y={-1836.57}
            z={-7679.60}

            scale={100.00}

            onIntersect={(() => {
              handleOnHtmlTxt("greek-island")
            })}

            onIntersectOut={(() => {
              handleOffHtmlTxt("greek-island")
            })}
          />


          <Model
            name="portalForest"

            adjustColor="#00fff2"
            physics="map"
            width={245.36}
            depth={245.36}


            scale={34.99}

            x={9839.41}
            y={-468.15}
            z={-10828.57}

            rotationX={-76.79}
            rotationY={0.48}
            rotationZ={-33.41}

            src="maps/item/stargate.glb"
            onClick={((e) => {
              handleClick(e)
            })}
          >
            <HtmlTxt text={"Travel to Forest Island"} url={''} id="forest-island" />
          </Model>


          <Trigger
            name="triggerForest"
            targetIds="player"
            radius={800}

            x={9839.41}
            y={-468.15}
            z={-10828.57}

            interval={1}

            onEnter={(() => {
              handleOnPlayerFly("forest-island")
            })}
            onExit={(() => {
              handleOutPlayerFly()
            })}
          />

          <Cube
            name="triggerForestHtml"
            intersectIds={["player"]}
            color="red"

            rotationX={-166.00}
            rotationY={32.00}
            rotationZ={-3.00}

            opacity={0.1}

            visible={false}

            x={9839.41}
            y={-468.15}
            z={-10828.57}

            scale={100.00}

            onIntersect={(() => {
              handleOnHtmlTxt("forest-island")
            })}

            onIntersectOut={(() => {
              handleOffHtmlTxt("forest-island")
            })}
          />

        </Group>

        <AreaLight
          name="batteryLight"
          x={-85.85}
          y={-682.16}
          z={-487.23}
          rotationY={82.72}
        />

        <Group
          name="Battery"
          x={-169.30}
          y={-680.33}
          z={-509.88}
        >

          {/* //collect token */}
          <Trigger
            ref={triggerBatteryRef}
            radius={450.00}
            name="triggerBattery"
            targetIds="player"
            onEnter={(() => {
              handleOnHtmlTxt("props-coin")
            })}
            onExit={(() => {
              handleOffHtmlTxt("props-coin")
            })}
            helper={true}
            visible={true}

          />

          {/* //info token */}
          <Sphere
            name="batterySphere"
            scale={3.00}
            color="#ffa400"
            opacity={0.5}
            visible={true}
            intersectIds={["player"]}
            onIntersect={(() => {
              handleItem("Battery")
            })}

          />

          <Model
            name="batteryModel"
            src="item/coin.glb"
            bloom
            opacity={0.5}
            y={0}
            animationPaused={false}
            animationRepeat={false}
            animation={{ rotationY: [0, 45, 90, 135, 180, 225, 270, 315] }}
          >

            <HtmlTxt ref={htmlRef} text={"Collect your coin"} url={''} id="props-coin" />

          </Model>

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
          innerY={35.00}

          enableZoom
          minPolarAngle={100}


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
            animations={{ float: "3dCharacter/new/Floating.fbx" }}

            width={50}
            depth={50}

            mass={1}
            receiveShadow={true}

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

        <Plane
          id="plane"
          name="plane"
          visible={false}
          x={1734.96}
          y={-7603.29}
          z={-509.88}
          scale={150.00}
          rotationX={-90.00}
          intersectIds={["player"]}
          onIntersect={(() => {
            handlePlayerFall()
          })}
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

export default MainIsland;
