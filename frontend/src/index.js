import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Pages/App/App.jsx";
import reportWebVitals from "./js/reportWebVitals";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min";
import "./css/index.css";
// AOS Anmation 
import "../node_modules/aos/dist/aos.css"
import "../node_modules/aos/dist/aos.js"
import "./css/responsive.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <App />
  // {/* </React.StrictMode> */}
);

reportWebVitals();
