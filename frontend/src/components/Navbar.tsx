import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isFilmsPage = location.pathname === "/films";
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="nav flex items-center justify-between">
      <Link to="/">
        <h2 className="font-researcher ">FILM FAVES</h2>
      </Link>

      <div className="flex items-center gap-2">
        {isFilmsPage && (
          <Link to="/recommend">
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
          </Link>
        )}
        {!isLoginPage && (
          <Link to="/login" className="font-aquire tracking-widest">
            Login
          </Link>
        )}
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
