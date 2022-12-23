import React from "react";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import World from "./Game/World";
import Theme from "./Theme";
import Iframe from "./page/Iframe";
import Nomenu from "./page/Nomenu";
import "./App.css";
import ResponsiveDrawer from "./component/Drawer";

import Game from "./Game/Game";
import MainIsland from "./Game/MainIsland";
import ForestIsland from "./Game/ForestIsland";
import JapanIsland from "./Game/JapanIsland";
import ChineseIsland from "./Game/ChineseIsland";
import GreekIsland from "./Game/GreekIsland";


function Home() {
  return (
    <div
      style={{
        backgroundColor: "transparent",
        color: "white"
      }}
    >
      <h1>Home</h1>
      <nav>
        <ul>
          <li>
            <Link to="/tunnel">tunnel</Link>
          </li>
          <li>
            <Link to="/main-island">main-island</Link>
          </li>

          <li>
            <Link to="/forest-island">forest-island</Link>
          </li>

          <li>
            <Link to="/japan-island">japan-island</Link>
          </li>

          <li>
            <Link to="/chinese-island">chinese-island</Link>
          </li>

          <li>
            <Link to="/greek-island">greek-island</Link>
          </li>
        </ul>
      </nav>

    </div >
  );
}

function App() {
  const theme = createTheme(Theme);
  const viteBaseUrl = import.meta.env.VITE_BASE_URL;

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter basename={`${viteBaseUrl}`}>
          <Routes>

            <Route path="/" element={<ResponsiveDrawer />}>

              <Route index element={<Home />} />

              <Route path="tunnel" element={<World />} />
              <Route path="main-island" element={<MainIsland />} />
              <Route path="forest-island" element={<ForestIsland />} />
              <Route path="japan-island" element={<JapanIsland />} />
              <Route path="chinese-island" element={<ChineseIsland />} />
              <Route path="greek-island" element={<GreekIsland />} />

              <Route
                path="portfolio"
                element={<Nomenu url={"https://i-smart.com.sg/portfolio/"} />}
              />
              <Route
                path="service"
                element={
                  <Iframe url={"https://i-smart.com.sg/service/"} />
                }
              />
              <Route
                path="services/softwaredev"
                element={
                  <Iframe
                    url={
                      "https://360xp.co/ismartwebsite/services/#softwaredev_section"
                    }
                  />
                }
              />
              <Route
                path="services/ecommerce"
                element={
                  <Iframe
                    url={
                      "https://360xp.co/ismartwebsite/services/#ecommerce_section"
                    }
                  />
                }
              />
              <Route
                path="services/websitedesign"
                element={
                  <Iframe
                    url={
                      "https://360xp.co/ismartwebsite/services/#websitedesign_section"
                    }
                  />
                }
              />
              <Route
                path="services/webminigame"
                element={
                  <Iframe
                    url={
                      "https://360xp.co/ismartwebsite/services/#webminigame_section"
                    }
                  />
                }
              />
              <Route
                path="services/virtualevent"
                element={
                  <Iframe
                    url={
                      "https://360xp.co/ismartwebsite/services/#virtualevent_section"
                    }
                  />
                }
              />
              <Route
                path="services/onlineshowroom"
                element={
                  <Iframe
                    url={
                      "https://360xp.co/ismartwebsite/services/#onlineshowroom_section"
                    }
                  />
                }
              />
              <Route
                path="services/3dvisualization"
                element={
                  <Iframe
                    url={
                      "https://360xp.co/ismartwebsite/services/#3dvisualization_section"
                    }
                  />
                }
              />
              <Route
                path="services/metaverse"
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
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
