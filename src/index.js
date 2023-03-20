import { createRoot } from "react-dom/client";
import * as React from "react";
import { StyledEngineProvider, CssVarsProvider } from "@mui/joy/styles";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <CssVarsProvider>
        <App />
      </CssVarsProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
