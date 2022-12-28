import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import Theme from "./Theme";
import Iframe from "./page/Iframe";
import Nomenu from "./page/Nomenu";

import World from "./Game/World";
import MainIsland from "./Game/MainIsland";
import ForestIsland from "./Game/ForestIsland";
import JapanIsland from "./Game/JapanIsland";
import ChineseIsland from "./Game/ChineseIsland";
import GreekIsland from "./Game/GreekIsland";

import "./App.css";

const viteBaseUrl = import.meta.env.VITE_BASE_URL;


function App() {
  const theme = createTheme(Theme);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter basename={`${viteBaseUrl}`}>
          <Routes>

            <Route index element={<World />} />

            <Route path="main-island" element={<MainIsland />} />
            <Route path="japan-island" element={<JapanIsland />} />
            <Route path="chinese-island" element={<ChineseIsland />} />
            <Route path="greek-island" element={<GreekIsland />} />
            <Route path="forest-island" element={<ForestIsland />} />

            <Route
              path="case-study"
              element={<Nomenu url={"https://360xp.co/ismartwebsite/"} />}
            />
            <Route
              path="service"
              element={
                <Iframe url={"https://360xp.co/ismartwebsite/services/"} />
              }
            />
            <Route
              path="service/custom-software"
              element={
                <Iframe
                  url={
                    "https://360xp.co/ismartwebsite/services/#softwaredev_section"
                  }
                />
              }
            />
            <Route
              path="service/e-commerce"
              element={
                <Iframe
                  url={
                    "https://360xp.co/ismartwebsite/services/#ecommerce_section"
                  }
                />
              }
            />
            <Route
              path="service/website-design"
              element={
                <Iframe
                  url={
                    "https://360xp.co/ismartwebsite/services/#websitedesign_section"
                  }
                />
              }
            />
            <Route
              path="service/web-mini-game"
              element={
                <Iframe
                  url={
                    "https://360xp.co/ismartwebsite/services/#webminigame_section"
                  }
                />
              }
            />
            <Route
              path="service/virtual-event"
              element={
                <Iframe
                  url={
                    "https://360xp.co/ismartwebsite/services/#virtualevent_section"
                  }
                />
              }
            />
            <Route
              path="service/online-showroom"
              element={
                <Iframe
                  url={
                    "https://360xp.co/ismartwebsite/services/#onlineshowroom_section"
                  }
                />
              }
            />
            <Route
              path="service/3d-visualization"
              element={
                <Iframe
                  url={
                    "https://360xp.co/ismartwebsite/services/#3dvisualization_section"
                  }
                />
              }
            />
            <Route
              path="service/metaverse"
              element={
                <Iframe
                  url={
                    "https://360xp.co/ismartwebsite/services/#metaverse_section"
                  }
                />
              }
            />
            <Route
              path="about-us"
              element={
                <Iframe url={"https://360xp.co/ismartwebsite/about-us/"} />
              }
            />
            <Route
              path="contact-us"
              element={
                <Iframe url={"https://360xp.co/ismartwebsite/contact-us/"} />
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
