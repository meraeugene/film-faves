import SortedFilms from "../components/SortedFilms";
import { useEffect, useState } from "react"; // Import useState and useEffect
import axios from "axios";
import { useFilmsContext } from "../hooks/useFilmsContext";
import FilmCardSkeleton from "../components/FilmCardSkeleton";
import { Film } from "../types/Film";

import TopFavoritesSwiper from "../components/TopFilms";

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
  const { state: films, dispatch } = useFilmsContext();
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
      } catch (error) {
        console.error("Error fetching films:", error);
        setIsLoading(false); // Error occurred, set isLoading to false
      }
    };

    // Simulate a delay to see the loading text
    fetchFilms();
  }, [dispatch]);

  const filmsSortedByLikes = films.films.sort((a, b) => b.likes - a.likes);
  const top10Favorites = filmsSortedByLikes.slice(0, 10);

  return (
    <div className="bg-dark px-4  py-6 text-white md:px-10 md:py-8">
      {isLoading ? (
        <FilmCardSkeleton cardNumber={3} />
      ) : (
        <>
          <TopFavoritesSwiper topFavorites={top10Favorites} />
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
