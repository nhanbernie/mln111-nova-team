import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MLN from "./MLN.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MLN />
  </StrictMode>
);
