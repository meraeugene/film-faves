import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");

    // remove user from storage

    localStorage.removeItem("user");

    // dispatch log out action

    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
