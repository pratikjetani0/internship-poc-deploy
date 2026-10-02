import "@/styles/globals.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { AppProvider } from "./app/providers";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
);
