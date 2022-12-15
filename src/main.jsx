// import { createRoot } from "react-dom/client";
// import "./index.css";
// Hamirul
// import App from "./App"
// import App from "./App.jsx";

// const root = createRoot(document.getElementById("root")!)
// root.render(<App />)
// Basiir  
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// eslint-disable-next-line
import "swiper/css/bundle";

const container = document.getElementById("root")

const root = createRoot(container);
root.render(<App />);
