import { Suspense, useEffect, useRef, useState } from "react";

import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";

import {
  Dummy,
  Find,
  Group,
  Model,
  Setup,
  Stats,
  ThirdPersonCamera,
  LingoEditor,
  useWindowSize,
  World,
  useSpring,
  Joystick,
  Trigger,
  AreaLight,
  Sphere,
  useScene,
  useRenderer,
  Circle,
  Plane,
  Skybox,
  Camera,
  useLoop,
  useKeyboard,
  Cube
} from "lingo3d-react";

import *  as THREE from 'three'
import { Water } from 'three/examples/jsm/objects/Water';

import { ImprovedNoise } from 'https://unpkg.com/three/examples/jsm/math/ImprovedNoise.js';

import ScrollDialog from "../component/ScrollDialog";
import { render } from "react-dom";
import HtmlTxt from "../component/UiUx/HtmlTxt";


const viteBaseUrl = import.meta.env.VITE_BASE_URL;


const ChineseIsland = () => {


  const worldRef = useRef(null);
  const dummyRef = useRef(null);
  const dummyBatteryRef = useRef(null);
  const cameraRef = useRef(null);
  const tpcRef = useRef(null);
  const htmlRef = useRef(null);

  const triggerBatteryRef = useRef(null);
  const pointerRef = useRef(null);
  const portalRef = useRef(null);

  const scene = useScene()
  const key = useKeyboard()

  const water = scene.getObjectByName("waterShader")
  const cloud = scene.getObjectByName("cloudShader")

  const getRenderer = useRenderer()

  const { width, height } = useWindowSize();
  const [isGame, setGame] = useState(true);
  const [isWater, setWater] = useState(false);
  const [arrowPosition, setArrowPosition] = useState({ x: 0, y: 0, z: 0 });


  useLoop(() => {
    water.material.uniforms['time'].value += 1.0 / 60.0
    cloud.material.uniforms['frame'].value++; 1
  }, isWater);


  const isInital = sessionStorage.getItem("inital");
  const isLogin = sessionStorage.getItem("login");

  isInital == null && sessionStorage.setItem("inital", false);
  isLogin == null && sessionStorage.setItem("login", false);

  //mouseOver
  const [mouseOver, setMouseOver] = useState(false);
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
  };

  const handleItem = (name) => {

    name == "Battery" && handleDialogToggle("coin Collected")

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
  };

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

  };

  const handleOutPlayerFly = () => {
    // const playerRefObj = dummyRef.current
  };

  const handlePlayerFall = () => {

    const dummy = dummyRef.current;
    dummy.animationManagers["idle"].play()

    dummy.moveTo(-404.36, undefined, 194.50, 12);

    dummy.y = 238.87
    dummy.x = -404.36
    dummy.z = 194.50
  };

  const handleCamera = () => {
    setTimeout(() => {
      tpcRef.current.active = true
    }, 1000)
  };

  const handleOnShader = () => {

    handleSky()

    const vertexShader = /* glsl */`
    attribute float size;
    varying vec3 vColor;
    void main() {
      vColor = color;
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      gl_PointSize = size * ( 300.0 / -mvPosition.z );
      gl_Position = projectionMatrix * mvPosition;

    }
  `;

    const fragmentShader = /* glsl */`
    uniform sampler2D pointTexture;
    varying vec3 vColor;
    void main() {
      gl_FragColor = vec4( vColor, 1.0 );
      gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
    }
				`;

    // Texture

    const size = 128;
    const data = new Uint8Array(size * size * size);

    let i = 0;
    const scale = 0.05;
    const perlin = new ImprovedNoise();
    const vector = new THREE.Vector3();

    for (let z = 0; z < size; z++) {

      for (let y = 0; y < size; y++) {

        for (let x = 0; x < size; x++) {

          const d = 1.0 - vector.set(x, y, z).subScalar(size / 2).divideScalar(size).length();
          data[i] = (128 + 128 * perlin.noise(x * scale / 1.5, y * scale, z * scale / 1.5)) * d * d;
          i++;

        }

      }

    }

    const texture = new THREE.Data3DTexture(data, size, size, size);
    texture.format = THREE.RedFormat;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.unpackAlignment = 1;
    texture.needsUpdate = true;

    let uniforms


    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const geometry1 = new THREE.BoxGeometry(1, 1, 1);

    uniforms = {
      pointTexture: { value: new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/309b00afb6dcbc5e6c58e72f10eaa8d2e8888c83/examples/textures/sprites/spark1.png') }

    };

    const shaderMaterial = new THREE.ShaderMaterial({

      uniforms: uniforms,
      uniformsGroups: [],
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,

      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      vertexColors: true

    });

    shaderMaterial.uniformsGroups = []

    const mesh = new THREE.Mesh(geometry1, shaderMaterial);
    const cube = new THREE.Mesh(geometry, shaderMaterial);

    const waterGeometry = new THREE.PlaneGeometry(20, 20);

    let water;

    water = new Water(
      waterGeometry,
      {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load('img/shader/waternormals.jpg', function (texture) {

          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

        }),
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 3.7,
        fog: scene.fog !== undefined
      }
    );


    // mesh.parent = cube.parent

    water.rotation.x = - Math.PI / 2;


    console.log("water", water)
    console.log("cube", cube)
    // console.log("mesh", mesh)

    cube.name = "cubeShader"
    cube.position.x = -5
    cube.position.y = 0
    cube.position.z = 0

    water.name = "waterShader"
    water.position.y = -1.1;

    setWater(true)

    scene.add(water);
    scene.add(cube)



  };

  const handleOffShader = () => {
    const cubeShader = scene.getObjectByName("cubeShader")
    const waterShader = scene.getObjectByName("waterShader")
    const cloudShader = scene.getObjectByName("cloudShader")

    console.log("scene", scene)

    waterShader?.geometry.dispose()
    waterShader?.material.dispose()

    cloudShader?.material.dispose()
    cloudShader?.geometry.dispose()

    scene.remove(cloudShader)
    scene.remove(cubeShader)
    scene.remove(waterShader)
  }

  const handleScene = () => {
    console.log("scene", scene.children)
    console.log("render", getRenderer.info.memory)
  }

  const handleSky = () => {


    const size = 128;
    const data = new Uint8Array(size * size * size)

    let i = 0;
    const scale = 0.05;
    const perlin = new ImprovedNoise();
    const vector = new THREE.Vector3();

    for (let z = 0; z < size; z++) {

      for (let y = 0; y < size; y++) {

        for (let x = 0; x < size; x++) {

          const d = 1.0 - vector.set(x, y, z).subScalar(size / 2).divideScalar(size).length();
          data[i] = (128 + 128 * perlin.noise(x * scale / 1.5, y * scale, z * scale / 1.5)) * d * d;
          i++;

        }

      }

    }


    const texture = new THREE.Data3DTexture(data, size, size, size);
    texture.format = THREE.RedFormat;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.unpackAlignment = 1;
    texture.needsUpdate = true;

    // Material
    const vertexShader = /* glsl */`
      in vec3 position;
  
      uniform mat4 modelMatrix;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      uniform vec3 cameraPos;
  
      out vec3 vOrigin;
      out vec3 vDirection;
  
      void main() {
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  
        vOrigin = vec3( inverse( modelMatrix ) * vec4( cameraPos, 1.0 ) ).xyz;
        vDirection = position - vOrigin;
  
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = /* glsl */`
      precision highp float;
      precision highp sampler3D;
  
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
  
      in vec3 vOrigin;
      in vec3 vDirection;
  
      out vec4 color;
  
      uniform vec3 base;
      uniform sampler3D map;
  
      uniform float threshold;
      uniform float range;
      uniform float opacity;
      uniform float steps;
      uniform float frame;
  
      uint wang_hash(uint seed)
      {
        seed = (seed ^ 61u) ^ (seed >> 16u);
        seed *= 9u;
        seed = seed ^ (seed >> 4u);
        seed *= 0x27d4eb2du;
        seed = seed ^ (seed >> 15u);
        return seed;
      }
  
      float randomFloat(inout uint seed)
      {
        return float(wang_hash(seed)) / 4294967296.;
      }
  
      vec2 hitBox( vec3 orig, vec3 dir ) {
      const vec3 box_min = vec3( - 0.5 );
      const vec3 box_max = vec3( 0.5 );
      vec3 inv_dir = 1.0 / dir;
      vec3 tmin_tmp = ( box_min - orig ) * inv_dir;
      vec3 tmax_tmp = ( box_max - orig ) * inv_dir;
      vec3 tmin = min( tmin_tmp, tmax_tmp );
      vec3 tmax = max( tmin_tmp, tmax_tmp );
      float t0 = max( tmin.x, max( tmin.y, tmin.z ) );
      float t1 = min( tmax.x, min( tmax.y, tmax.z ) );
      return vec2( t0, t1 );
      }
  
      float sample1( vec3 p ) {
      return texture( map, p ).r;
      }
  
      float shading( vec3 coord ) {
      float step = 0.01;
      return sample1( coord + vec3( - step ) ) - sample1( coord + vec3( step ) );
      }
  
      void main(){
      vec3 rayDir = normalize( vDirection );
      vec2 bounds = hitBox( vOrigin, rayDir );
  
      if ( bounds.x > bounds.y ) discard;
  
      bounds.x = max( bounds.x, 0.0 );
  
      vec3 p = vOrigin + bounds.x * rayDir;
      vec3 inc = 1.0 / abs( rayDir );
      float delta = min( inc.x, min( inc.y, inc.z ) );
      delta /= steps;
  
      // Jitter
  
      // Nice little seed from
      // https://blog.demofox.org/2020/05/25/casual-shadertoy-path-tracing-1-basic-camera-diffuse-emissive/
      uint seed = uint( gl_FragCoord.x ) * uint( 1973 ) + uint( gl_FragCoord.y ) * uint( 9277 ) + uint( frame ) * uint( 26699 );
      vec3 size = vec3( textureSize( map, 0 ) );
      float randNum = randomFloat( seed ) * 2.0 - 1.0;
      p += rayDir * randNum * ( 1.0 / size );
  
      //
  
      vec4 ac = vec4( base, 0.0 );
  
      for ( float t = bounds.x; t < bounds.y; t += delta ) {
  
        float d = sample1( p + 0.5 );
  
        d = smoothstep( threshold - range, threshold + range, d ) * opacity;
  
        float col = shading( p + 0.5 ) * 3.0 + ( ( p.x + p.y ) * 0.25 ) + 0.2;
  
        ac.rgb += ( 1.0 - ac.a ) * d * col;
  
        ac.a += ( 1.0 - ac.a ) * d;
  
        if ( ac.a >= 0.95 ) break;
  
        p += rayDir * delta;
  
      }
  
      color = ac;
  
      if ( color.a == 0.0 ) discard;
  
      }
      `;

    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const material = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      uniforms: {
        base: { value: new THREE.Color(0x798aa0) },
        map: { value: texture },
        cameraPos: { value: new THREE.Vector3() },
        threshold: { value: 0.25 },
        opacity: { value: 0.25 },
        range: { value: 0.1 },
        steps: { value: 100 },
        frame: { value: 0 }
      },
      vertexShader,
      fragmentShader,
      side: THREE.BackSide,
      transparent: true
    });

    let mesh;

    mesh = new THREE.Mesh(geometry, material);

    console.log("mesh", mesh)

    mesh.name = "cloudShader"
    mesh.position.x = -2
    mesh.position.y = 1
    mesh.position.z = 0


    const parameters = {
      threshold: 0.25,
      opacity: 0.25,
      range: 0.1,
      steps: 100
    };

    material.uniforms.threshold.value = parameters.threshold;
    material.uniforms.opacity.value = parameters.opacity;
    material.uniforms.range.value = parameters.range;
    material.uniforms.steps.value = parameters.steps;

    scene.add(mesh);

  }

  const animate = () => {
    const camera = scene.getObjectByName("camera");
    getRenderer.render(scene, camera)
    requestAnimationFrame(animate)
  };


  const handleOnHtmlTxt = (idTxt) => {
    const htmlTextElm = document.getElementById(`htmlRef${idTxt}`)
    htmlTextElm.style.visibility = "visible"
  }

  const handleOffHtmlTxt = (idTxt) => {
    const htmlTextElm = document.getElementById(`htmlRef${idTxt}`)
    htmlTextElm.style.visibility = "hidden"
  }

  const handleMenu = () => {
    setDialogOpen(true);
    setHtmlFor("menu")
  }

  const handleMap = () => {
    setDialogOpen(true);
    setHtmlFor("map")
  }


  return (
    <>
      {/* <Button
        className="testButton"
        onClick={handleScene}
      >
        scene
      </Button>

      <Button
        className="testButton"
        onClick={handleOnShader}
      >
        shaderOn
      </Button>

      <Button
        className="testButton"
        onClick={handleOffShader}
      >
        shaderOff
      </Button> */}



      <Stack
        sx={{
          position: "relative",
          float: "right",
        }}
      >
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
          antiAlias={true}
        />

        <Skybox texture={`${viteBaseUrl}img/sky/sky1.jpg`} />

        <Model
          name="worldmap"
          physics="map"
          width={245.36}
          depth={245.36}
          scaleX={20}
          scaleY={20}
          scaleZ={20}
          x={2022.20}
          y={-1246.54}
          z={-761.98}
          scale={70}
          src={`${viteBaseUrl}maps/chinese/chinese_island.glb`}
          onClick={!isMobile && handleClick}
        >

          <Find name="AM113_021_Populus_Defintion.023"
            textureFlipY={false}
            opacity={0.9}
            texture={`${viteBaseUrl}maps/chinese/new/chinese_island_img4.png`}
          />

          <Find name="water.001" />
          <Find name="mountain" />

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

        <Group
          name="groupPortal"
          x={2600.92}
          y={147.73}
          z={-1815.55}
          rotationY={-31.42}
          rotationX={-164.79}
          rotationZ={-174.30}
          scale={0.50}
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
            radius={300.00}
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
            src={`${viteBaseUrl}maps/item/stargate.glb`}
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

            x={53.49}
            y={-22.02}
            z={509.59}

            scale={10.00}

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
          y={58.76}
          z={0}

        >


          {/* //collect token */}
          <Trigger
            ref={triggerBatteryRef}
            radius={250.00}
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
            scale={2.50}
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
            src={`${viteBaseUrl}item/coin.glb`}
            bloom
            animation={{ rotationY: [0, 45, 90, 135, 180, 225, 270, 315] }}

            opacity={0.5}
            animationPaused={false}
            animationRepeat={false}

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

          enableZoom
          minPolarAngle={100}
          // azimuthAngle={90}
          // minAzimuthAngle={180}

          innerY={50}
          y={100}
          zoom={1}
        >

          <Dummy
            id="player"
            name="player"
            ref={dummyRef}


            strideMove
            strideMode="free"
            src={`${viteBaseUrl}3dCharacter/new/character1.glb`}
            physics="character"
            animations={{ float: `${viteBaseUrl}3dCharacter/new/Floating.fbx` }}

            width={50}
            depth={50}

            mass={1}

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
              src={`${viteBaseUrl}item/coin.glb`}
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
          src={`${viteBaseUrl}dummy/p2p_a.glb`}
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
          {/* <Circle
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
          /> */}
        </Group>

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

export default ChineseIsland;
