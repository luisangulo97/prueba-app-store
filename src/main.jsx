import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App.jsx";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/primereact.min.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PrimeReactProvider value={{ unstyled: false }}>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>
);
