const openPortal = (url) => {
  window.open(` ${viteBaseUrl + url}`, "_self");
};

const handleInstructionClose = () => {
  setGame(false);
  setTimeout(() => {
    isLogin == "true" ? handleCamera() : handleDialogToggle("avatar");
  }, 1000);
};

const handleClick = (e) => {
  const dummy = dummyRef.current;
  if (!dummy) return;

  const pointAnimation = pointerRef.current;
  if (!pointAnimation) return;

  setArrowPosition(e.point);

  pointAnimation.visible = true;
  pointAnimation.bloom = true;

  const animation = pointAnimation.animationManagers;
  animation["Scene"].play();

  dummy.lookTo(e.point.x, undefined, e.point.z, 0.2);
  dummy.moveTo(e.point.x, undefined, e.point.z, 12);

  // active portal
  const animationPortal = dummy.animationManagers;
  animationPortal["running"].play();

  dummy.onMoveToEnd = () => {
    animationPortal["idle"].play();
    pointAnimation.visible = false;
  };
};

const handleItem = (name) => {
  name == "Battery" && handleDialogToggle("Info Board");

  const allChildren = scene.children;
  const array1 = allChildren.filter((x) => x.name == name);

  // active portal
  // const animationPortal = portalRef.current.animationManagers
  // animationPortal["Take 001"].play()
  // portalRef.current.bloom = true

  //pass battery to player
  dummyBatteryRef.current.visible = true;
  dummyBatteryRef.current.animation = {
    y: [80, 80 + 0.5, 80, 80 - 0.5, 80],
    rotationY: [0, 45, 90, 135, 180, 225, 270, 315],
  };

  //remove battery
  const MeshInModel = array1[0].children.filter(
    (x) =>
      (x.type != `Group` && x.name == "batterySphere") ||
      x.name == "batteryModel"
  );
  MeshInModel.map((item) => {
    item.children
      .filter((x) => x.type == "Mesh")
      .map((item) => {
        item.material.dispose();
        item.geometry.dispose();
        item.parent.remove(item);
      });
  });

  scene.remove(array1[0]);
  triggerBatteryRef.current.dispose();

  // animate()
};

const handleDialogToggle = (name) => {
  setDialogOpen(!dialogOpen);
  setHtmlFor(name);
};

const openDialogToggle = (name) => {
  setDialogOpen(false);
  setTimeout(() => {
    if (isLogin == "false") {
      setDialogOpen(true);
      setHtmlFor(name);
    } else {
      setDialogOpen(false);
      setHtmlFor();
      handleCamera();
    }
  }, 500);
};

const handleClose = (id) => {
  id = "avatarClose" ? openDialogToggle("register") : setDialogOpen(false);
};

const handleOnPlayerFly = (url) => {
  const playerRefObj = dummyRef.current;

  playerRefObj.animationManagers["float"].animationRepeat = true;

  setTimeout(() => {
    playerRefObj.animationManagers["float"].play();
    playerRefObj.velocity.y = 1;

    setTimeout(() => {
      openPortal(url);
    }, 1000);
  }, 1000);

  // playerRefObj.object3d.position.set(playerRefObj.x, Math.cos(time) * 0.2, playerRefObj.z)

  playerRefObj.onLoop = () => {
    if (playerRefObj.velocity.y === 0) {
      playerRefObj.onLoop = undefined;
    }
  };
};

const handleOutPlayerFly = () => {
  console.log("keluar");
  // const playerRefObj = dummyRef.current
};

const handlePlayerFall = () => {
  const dummy = dummyRef.current;
  dummy.animationManagers["idle"].play();

  dummy.moveTo(-169.3, undefined, -96.23, 12);

  dummy.y = -356.15;
  dummy.x = -169.3;
  dummy.z = -96.23;
};

const handleCamera = () => {
  setTimeout(() => {
    tpcRef.current.active = true;
  }, 1000);
};

const animate = () => {
  const camera = scene.getObjectByName("tpc");
  getRenderer.render(scene, camera.userData?.manager?.camera);
  window.requestAnimationFrame(animate);
};

const tree = () => {
  const groupPortal1 = scene.getObjectByName("groupPortal");

  console.log("getRenderer", getRenderer.info.memory);
};

export {
  tree,
  animate,
  handleCamera,
  handlePlayerFall,
  handleOutPlayerFly,
  handleOnPlayerFly,
  handleClose,
  openDialogToggle,
  handleDialogToggle,
  handleItem,
  handleClick,
  handleInstructionClose,
  openPortal,
};
