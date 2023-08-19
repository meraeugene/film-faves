import React, { createContext, ReactNode, useReducer } from "react";
import { Film } from "../types/Film";

interface FilmsState {
  films: Film[];
}

type Action =
  | { type: "SET_FILMS"; payload: Film[] }
  | { type: "CREATE_FILMS"; payload: Film };

interface FilmsContextProviderProps {
  children: ReactNode;
}

export const FilmsContext = createContext<
  | {
      state: FilmsState;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

export const filmsReducer = (state: FilmsState, action: Action): FilmsState => {
  switch (action.type) {
    case "SET_FILMS":
      return {
        films: action.payload,
      };
    case "CREATE_FILMS":
      return {
        films: [action.payload, ...(state.films || [])],
      };
    default:
      return state;
  }
};

export const FilmsContextProvider = ({
  children,
}: FilmsContextProviderProps) => {
  const [state, dispatch] = useReducer(filmsReducer, {
    films: [], // Make sure the initial value is an empty array
  });

  return (
    <FilmsContext.Provider value={{ state, dispatch }}>
      {children}
    </FilmsContext.Provider>
  );
};
