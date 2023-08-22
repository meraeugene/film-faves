import SortedFilms from "../components/SortedFilms";
import { useEffect, useState } from "react"; // Import useState and useEffect
import axios from "axios";
import { useFilmsContext } from "../hooks/useFilmsContext";
import FilmCardSkeleton from "../components/FilmCardSkeleton";
import { Film } from "../types/Film";
import { Tooltip } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface FilmGenreMap {
  [key: string]: Film[];
}

const genreFilters = [
  "action-adventure",
  "animation",
  "comedy",
  "documentaries",
  "filipino",
  "horror",
  "k-drama",
  "romantic",
  "sci-fi",
  "southeast asian",
  "thriller",
];

const Films = () => {
  const { dispatch } = useFilmsContext();
  const [isLoading, setIsLoading] = useState(true);
  const [filmsByGenre, setFilmsByGenre] = useState<FilmGenreMap>({});
  const [isGenreModalOpen, setIsGenreModalOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    const fetchFilms = async () => {
      window.scrollTo(0, 0);
      try {
        // const result = await axios.get("http://localhost:4000/api/films");
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/films`);
        const { data } = result.data;
        dispatch({ type: "SET_FILMS", payload: data });
        setIsLoading(false); // Data fetched, set isLoading to false

        // Organize films by genre
        const filmsGroupedByGenre = genreFilters.reduce((acc, genre) => {
          acc[genre] = data.filter((film: Film) => film.genre === genre);
          return acc;
        }, {} as FilmGenreMap);
        setFilmsByGenre(filmsGroupedByGenre);
      } catch (error) {
        console.error("Error fetching films:", error);
        setIsLoading(false); // Error occurred, set isLoading to false
      }
    };

    // Simulate a delay to see the loading text
    fetchFilms();
  }, [dispatch]);

  const openGenreModal = (genre: string) => {
    setSelectedGenre(genre);
    setIsGenreModalOpen(true);
    document.body.classList.add("modal-open"); // Add this line
  };

  const closeGenreModal = () => {
    setIsGenreModalOpen(false);
    document.body.classList.remove("modal-open"); // Add this line
  };

  const handleImageClick = () => {
    window.scrollTo({ top: 0 });
    document.body.classList.remove("modal-open"); // Add this line
  };

  return (
    <div className="bg-dark px-4  py-6 text-white md:px-10 md:py-8">
      {isLoading ? (
        <FilmCardSkeleton cardNumber={3} />
      ) : (
        <>
          {genreFilters.map((genre) => (
            <SortedFilms
              key={genre}
              title={genre}
              sortedFilm={filmsByGenre[genre]}
              openGenreModal={openGenreModal}
            />
          ))}
        </>
      )}

      {isGenreModalOpen && (
        <div className="main-container__modal">
          <div className="genre-movie__modal">
            <div
              className="genre-movie__modal-close-btn cursor-pointer"
              onClick={closeGenreModal}
            >
              <Tooltip label="Close">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 md:h-8 md:w-8 xl:h-8 xl:w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Tooltip>
            </div>

            <h1 className="t mt-12 text-center font-aquire  text-[22px] tracking-widest md:mt-16 md:text-5xl xl:text-6xl">
              {selectedGenre}
            </h1>

            <div className="mt-6 grid grid-cols-2 gap-4 md:mt-10 md:grid-cols-3 lg:grid-cols-4 xl:mt-8 xl:grid-cols-6">
              {filmsByGenre[selectedGenre]?.map((film) => (
                <Link
                  to={`/films/${film._id}`}
                  onClick={handleImageClick}
                  key={film._id}
                >
                  <img
                    src={film.image}
                    alt={film.title}
                    loading="lazy"
                    className="modal-image rounded-sm"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Films;
