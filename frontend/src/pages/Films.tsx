import SortedFilms from "../components/SortedFilms";
import { useEffect, useState } from "react"; // Import useState and useEffect

import axios from "axios";
import { useFilmsContext } from "../hooks/useFilmsContext";
import FilmCardSkeleton from "../components/FilmCardSkeleton";

import { Film } from "../types/Film";

const Films = () => {
  const {
    state: { films },
    dispatch,
  } = useFilmsContext();

  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const [latestFilms, setLatestFilms] = useState([]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        // const result = await axios.get("http://localhost:4000/api/films");
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/films`);
        const { data } = result.data;
        dispatch({ type: "SET_FILMS", payload: data });
        setIsLoading(false); // Data fetched, set isLoading to false

        // Filter films based on the current year after data is fetched
        const currentYear = new Date().getFullYear();
        const filteredLatestFilms = data.filter(
          (film: Film) => film.release_date === currentYear,
        );
        setLatestFilms(filteredLatestFilms);
      } catch (error) {
        console.error("Error fetching films:", error);
        setIsLoading(false); // Error occurred, set isLoading to false
      }
    };

    // Simulate a delay to see the loading text
    fetchFilms();
  }, [dispatch]);

  // Ensure films array exists and is not empty
  const isValidFilmsArray = Array.isArray(films) && films.length > 0;

  const actionAdventureFilms = films.filter(
    (film) => film.genre === "action-adventure",
  );
  const animationFilms = films.filter((film) => film.genre === "animation");
  const documentaryFilms = films.filter(
    (film) => film.genre === "documentaries",
  );
  const thrillerFilms = films.filter((film) => film.genre === "thriller");

  return (
    <div className="films bg-dark  text-white">
      {isLoading ? (
        <FilmCardSkeleton cardNumber={3} />
      ) : isValidFilmsArray ? (
        <>
          <SortedFilms title="new releases" sortedFilm={latestFilms} />
          <SortedFilms
            title="action-adventure"
            sortedFilm={actionAdventureFilms}
          />
          <SortedFilms title="anime" sortedFilm={animationFilms} />
          <SortedFilms title="documentaries" sortedFilm={documentaryFilms} />
          <SortedFilms title="thriller" sortedFilm={thrillerFilms} />{" "}
        </>
      ) : (
        <p>No films available.</p>
      )}
    </div>
  );
};

export default Films;
