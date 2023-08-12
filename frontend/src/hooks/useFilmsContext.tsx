import { FilmsContext } from "../context/FilmsContext";
import { useContext } from "react";

export const useFilmsContext = () => {
  const context = useContext(FilmsContext);

  if (!context) {
    throw Error("useFilmsContext must be used inside an FilmsContextProvider");
  }

  return context;
};
