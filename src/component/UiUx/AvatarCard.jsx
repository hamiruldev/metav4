import * as React from 'react';
import CardMedia from '@mui/material/CardMedia';

import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, EffectCards } from "swiper";
import DoneIcon from '@mui/icons-material/Done';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Box, Slide, Stack, Zoom } from '@mui/material';
import { useState } from 'react';
import { useRenderer, useScene } from 'lingo3d-react';

const MyArray = [
    {
        id: 1,
        name: 'Avatar 1',
        image: 'img/avatar/avatar1.jpg',
        model: "3dCharacter/new/character1.glb"
    },
    {
        id: 2,
        name: 'Avatar 2',
        image: 'img/avatar/avatar2.jpg',
        model: "3dCharacter/new/character2.glb"

    },
    {
        id: 3,
        name: 'Avatar 3',
        image: 'img/avatar/avatar3.jpg',
        model: "3dCharacter/new/character3.glb"

    },
];

export default function AvatarCard({ setAvatarButton }) {

    const scene = useScene()
    const getRenderer = useRenderer()
    const currentAvatar = scene.getObjectByName("player")
    const camera = scene.getObjectByName("tpc");

    const [avatar, setAvatar] = useState({ name: "", image: "", model: "", state: false })

    const handleAvatar = (id, image, model, state) => {

        getRenderer.render(scene, camera.userData.manager.camera)
        currentAvatar.userData.manager.srcState.set("3dCharacter/new/character1.glb")
        getRenderer.render(scene, camera.userData.manager.camera)

        setAvatar({ name: id, image: image, model: model, state: state })

        setTimeout(() => {
            currentAvatar.userData.manager.srcState.set(model)
            getRenderer.render(scene, camera.userData.manager.camera)

        }, 500);


        const animation = currentAvatar.userData.manager.animationManagers
        animation["idle"].play()

        setAvatarButton(true)

    }

    return (
        <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards, Pagination]}
            pagination={true}
            className="mySwiper"
        >
            {MyArray.map((item, key) => (
                <SwiperSlide key={key}>
                    <Stack direction={"column"}
                    >
                        <Box
                            sx={{
                                height: "30px",
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-end",
                                position: "relative",
                                top: "30px",
                            }}
                        >

                            {avatar?.state && avatar.name == item.name &&
                                <Zoom in={true}>
                                    <DoneIcon
                                        color="action"
                                        sx={{
                                            backgroundColor: "orange",
                                            borderRadius: "50px",
                                            position: "relative",
                                            top: "5px",
                                            right: "5px",
                                        }}
                                    />
                                </Zoom>
                            }
                        </Box>


                        <CardMedia
                            onClick={
                                (() => {
                                    handleAvatar(item.name, item.image, item.model, true)
                                })}
                            key={key}
                            id="cardmedia"
                            component="img"
                            alt="green iguana"
                            height="100"
                            src={item.image}
                        />
                    </Stack>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}