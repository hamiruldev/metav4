import React, { useState } from 'react'
import { usePreload, useScene } from 'lingo3d-react';
import CircularStatic from './CircularProgressWithLabel';
import { CircularProgress } from '@mui/material';

const viteBaseUrl = import.meta.env.VITE_BASE_URL;
const WelcomeButton = ({ handleReady, isReady }) => {

    const scene = useScene()
    const progress = usePreload(
        [
            `${viteBaseUrl}maps/main/main_island.glb`,
            `${viteBaseUrl}3dCharacter/new/character1.glb`,
            `${viteBaseUrl}3dCharacter/new/character2.glb`,
            `${viteBaseUrl}3dCharacter/new/character3.glb`,
            `${viteBaseUrl}3dCharacter/new/Running.fbx`,
            `${viteBaseUrl}3dCharacter/new/BreathingIdle.fbx`,
        ],
        "4mb"
    );

    setTimeout(() => {

        progress == 100 && scene.children.length > 7 && handleReady()

    }, 5000);

    return (
        <>
            {progress == 100 && scene.children.length > 7 && isReady ? "Next" : <CircularProgress size={20} sx={{ color: 'black' }} />}
        </>
    )
}

export default WelcomeButton