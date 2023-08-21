import SortedFilms from "../components/SortedFilms";
import { useEffect, useState } from "react"; // Import useState and useEffect
import axios from "axios";
import { useFilmsContext } from "../hooks/useFilmsContext";
import FilmCardSkeleton from "../components/FilmCardSkeleton";
import { Film } from "../types/Film";

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
  const [latestFilms, setLatestFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filmsByGenre, setFilmsByGenre] = useState<FilmGenreMap>({});

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

        // Filter latest films based on the current year
        const currentYear = new Date().getFullYear();
        setLatestFilms(
          data.filter((film: Film) => film.release_date === currentYear),
        );
      } catch (error) {
        console.error("Error fetching films:", error);
        setIsLoading(false); // Error occurred, set isLoading to false
      }
    };

    // Simulate a delay to see the loading text
    fetchFilms();
  }, [dispatch]);

  return (
    <div className="films bg-dark  text-white">
      {isLoading ? (
        <FilmCardSkeleton cardNumber={3} />
      ) : (
        <>
          <SortedFilms title="new releases" sortedFilm={latestFilms} />
          {genreFilters.map((genre) => (
            <SortedFilms
              key={genre}
              title={genre}
              sortedFilm={filmsByGenre[genre]}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Films;
