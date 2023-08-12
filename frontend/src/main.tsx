import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { FilmsContextProvider } from "./context/FilmsContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FilmsContextProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </FilmsContextProvider>
  </React.StrictMode>
);
