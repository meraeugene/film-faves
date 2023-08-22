import { useParams } from "react-router-dom";
import { useFilmsContext } from "../hooks/useFilmsContext";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const Genre = () => {
  const { genre } = useParams();

  const { state: films } = useFilmsContext();

  const genreFilms = films.films.filter((film) => film.genre === genre);

  return (
    <div className="  px-4 py-6 md:px-10">
      <Link to="/films" className=" w-0 ">
        <Button className="mb-8 font-aquire tracking-widest">
          <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.23047 11.8079L13.6879 8.09346C14.2089 7.65924 15 8.02976 15 8.70803V15.292C15 15.9702 14.2089 16.3408 13.6879 15.9065L9.23047 12.1921C9.11053 12.0921 9.11053 11.9079 9.23047 11.8079Z"
              fill="#222222"
            />
          </svg>
          Back
        </Button>
      </Link>
      <h1 className="mb-8 text-center font-aquire text-4xl text-white md:mb-10 md:text-5xl lg:mb-12 lg:text-6xl">
        {genre}
      </h1>
      <div className="masonry">
        {genreFilms.map((film) => (
          <div className="masonry-img__container">
            <Link
              to={`/films/${film._id}/${film.title}`}
              onClick={() => window.scrollTo({ top: 0 })}
            >
              <img
                src={film.image}
                alt={film.title}
                loading="lazy"
                className="w-full object-cover sm:h-[210px] md:h-[320px] lg:h-[360px] xl:h-full"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Genre;
