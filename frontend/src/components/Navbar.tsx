import { Link, useLocation } from "react-router-dom";
import { Button, Tooltip, useToast } from "@chakra-ui/react";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isFilmsPage = location.pathname.startsWith("/films");

  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  const { user } = useAuthContext();

  const toast = useToast();

  const recommendFilmButton = user ? (
    <Link to="/recommend">
      <Tooltip label="Recommend a Film" aria-label="A tooltip">
        <Button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Button>
      </Tooltip>
    </Link>
  ) : (
    <Tooltip label="Recommend a Film" aria-label="A tooltip">
      <Button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6 cursor-pointer"
          onClick={() =>
            toast({
              title: "Authentication Required",
              description: "Please login to recommend a film.",
              status: "error",
              duration: 2500,
              isClosable: true,
              position: "top",
            })
          }
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </Button>
    </Tooltip>
  );

  return (
    <div className="nav flex items-center justify-between">
      <Link to="/">
        <h2 className="font-researcher ">FILM FAVES</h2>
      </Link>

      <div className="flex items-center gap-2">
        {isFilmsPage && recommendFilmButton}

        {!isLoginPage && user && (
          <Button className="flex gap-1 font-aquire" onClick={handleLogout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
                clipRule="evenodd"
              />
            </svg>
            Logout
          </Button>
        )}

        {!isLoginPage && !user && (
          <Button>
            <Link to="/auth/login" className="font-aquire">
              Login
            </Link>
          </Button>
        )}

        {user && <span className="font-outfit">{user.username}</span>}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Navbar;
