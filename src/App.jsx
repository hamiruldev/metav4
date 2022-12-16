import React from "react";
// import { Routes, Route, BrowserRouter } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import World from "./Game/World";
import Theme from "./Theme";
import Iframe from "./page/Iframe";
import Nomenu from "./page/Nomenu";
import "./App.css";
import Game from "./Game/Game";
import Island from "./Game/Island";
import {
  Routes,
  Route,
  Outlet,
  Link,
  useMatch,
  useResolvedPath,
  BrowserRouter,
} from "react-router-dom";
import { redirect } from "react-router-dom";
import Layout from "./layout/Layout";
import ResponsiveDrawer from "./component/Drawer";
import { Home } from "@mui/icons-material";
import Homepage from "./page/Homepage";
import CardImage from "./page/CardImage";
import Gallery from "./page/Gallery";
import ReactVideoGallery from "./page/ReactVideoGallery";

function App() {
  const theme = createTheme(Theme);
  //const viteBaseUrl = import.meta.env.VITE_BASE_URL
  const viteBaseUrl = import.meta.env.VITE_BASE_URL;

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter basename={`${viteBaseUrl}`}>
          <Routes>
            <Route
              path="/"
              element={<Iframe url={"https://360xp.co/ismartwebsite/services"} />}
            />
            {/* <Route
              path="services"
              element={
                <Iframe url={"https://www.i-smart.com.sg/services/"} />
              }
            />
            <Route
              path="services/softwaredev"
              element={
                <Iframe
                  url={
                    "https://www.i-smart.com.sg/services/#softwaredev_section"
                  }
                />
              }
            />
            <Route
              path="services/ecommerce"
              element={
                <Iframe
                  url={
                    "https://www.i-smart.com.sg/services/#ecommerce_section"
                  }
                />
              }
            />
            <Route
              path="services/websitedesign"
              element={
                <Iframe
                  url={
                    "https://www.i-smart.com.sg/services/#websitedesign_section"
                  }
                />
              }
            />
            <Route
              path="services/webminigame"
              element={
                <Iframe
                  url={
                    "https://www.i-smart.com.sg/services/#webminigame_section"
                  }
                />
              }
            />
            <Route
              path="services/virtualevent"
              element={
                <Iframe
                  url={
                    "https://www.i-smart.com.sg/services/#virtualevent_section"
                  }
                />
              }
            />
            <Route
              path="services/onlineshowroom"
              element={
                <Iframe
                  url={
                    "https://www.i-smart.com.sg/services/#onlineshowroom_section"
                  }
                />
              }
            />
            <Route
              path="services/3dvisualization"
              element={
                <Iframe
                  url={
                    "https://www.i-smart.com.sg/services/#3dvisualization_section"
                  }
                />
              }
            />
            <Route
              path="services/metaverse"
              element={
                <Iframe
                  url={
                    "https://www.i-smart.com.sg/services/#metaverse_section"
                  }
                />
              }
            />
            <Route
              path="contact-us"
              element={
                <Iframe url={"https://www.i-smart.com.sg/contact-us/"} />
              }
            /> */}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

function NoMatch() {
  return (
    <div>
      <h1>Error 404</h1>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;
