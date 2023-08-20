import SortedFilms from "../components/SortedFilms";
import { useEffect } from "react"; // Import useState and useEffect

import axios from "axios";
import { useFilmsContext } from "../hooks/useFilmsContext";

const Films = () => {
  const {
    state: { films },
    dispatch,
  } = useFilmsContext();

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        // const result = await axios.get("http://localhost:4000/api/films");
        const result = await axios.get(`${import.meta.env.VITE_API_URL}/films`);
        const { data } = result.data;

        dispatch({ type: "SET_FILMS", payload: data });
      } catch (error) {
        console.error("Error fetching films:", error);
      }
    };

    // Simulate a delay to see the loading text
    fetchFilms();
  }, [dispatch]);

  const currentYear = new Date().getFullYear();
  const latestFilms = films.filter((film) => film.release_date === currentYear);

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
      <>
        <SortedFilms title="new releases" sortedFilm={latestFilms} />

        <SortedFilms
          title="action-adventure"
          sortedFilm={actionAdventureFilms}
        />

        <SortedFilms title="anime" sortedFilm={animationFilms} />

        <SortedFilms title="documentaries" sortedFilm={documentaryFilms} />
        <SortedFilms title="thriller" sortedFilm={thrillerFilms} />

        {/* <Pagination page={page} pages={pages} changePage={setPage} /> */}
      </>
    </div>
  );
};

export default Films;
