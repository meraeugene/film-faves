import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const Home = () => {
  return (
    <>
      <div className="home-hero flex items-center justify-center">
        <div className="home-content flex flex-col  items-center gap-4 text-white">
          <div className="home-info">
            <h1 className="text-center font-researcher text-6xl leading-none tracking-wider  lg:text-7xl xl:text-8xl">
              Film
            </h1>
            <h1 className="text-center font-researcher text-6xl leading-none tracking-wider  lg:text-7xl xl:text-8xl">
              Faves
            </h1>

            <p className="home-desc mt-2 text-center font-outfit text-lg tracking-normal">
              Explore, enjoy, and
            </p>
            <p className="home-desc text-center font-outfit text-lg tracking-normal ">
              share favorite films here.
            </p>
          </div>

          <div className="mt-2 flex flex-col items-center gap-4 font-aquire tracking-widest">
            <Link to="/films" className="">
              <Button className="flex items-center justify-center gap-2 text-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
                    clipRule="evenodd"
                  />
                </svg>
                Explore
              </Button>
            </Link>
          </div>

          <div className="absolute bottom-5 text-center font-outfit">
            <p className="text-sm ">Film Faves Philippines</p>
            <p className="text-xs">Developed by Andrew</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
