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
              index path ="/"
              // element={<Iframe url={"https://360xp.co/ismartwebsite/services"} />}
              element={<Iframe url={"https://360xp.co/ismartwebsite/contact-us"} />}
              // element={<Nomenu url={"https://360xp.co/ismartwebsite/contact-us"} />}
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
