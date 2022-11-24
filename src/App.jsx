import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import World from "./Game/World";
import Theme from "./Theme";
import "./App.css";

function App() {
  const theme = createTheme(Theme);
  const viteBaseUrl = import.meta.env.VITE_BASE_URL;

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter basename={`${viteBaseUrl}`}>
          <Routes>
            <Route path="/" element={<World />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
