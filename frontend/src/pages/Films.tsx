import axios from "axios";
import { useFilmsContext } from "../hooks/useFilmsContext";
import { useEffect, useState, useMemo } from "react";
import Card from "../components/Card";

const Films = () => {
  const {
    state: { films },
    dispatch,
  } = useFilmsContext();

  const fetchFilms = async () => {
    const result = await axios.get("https://film-gwjd.onrender.com/api/films");
    const data = result.data.data;
    dispatch({ type: "SET_FILMS", payload: data });
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  const [genre, setGenre] = useState("");

  const handleSelectGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(e.target.value);
  };

  const filteredFilms = useMemo(() => {
    if (genre === "") {
      return films;
    } else {
      return films.filter((film) => film.category === genre);
    }
  }, [genre, films]);
  return (
    <div className="films bg-dark  text-white">
      <h1 className="pb-4  text-center  font-researcher text-xl tracking-widest md:text-5xl lg:text-6xl xl:mx-auto xl:max-w-6xl">
        Top Films Recommendations
      </h1>
      <select
        className="w-full font-aquire lg:text-lg "
        id="category"
        onChange={handleSelectGenre}
      >
        <option value="" hidden>
          Select a category
        </option>
        <option value="">All</option>
        <option value="live-action">Live-action Movies</option>
        <option value="animation">Animation</option>
      </select>
      <div className="mt-12 grid grid-cols-1 gap-14 md:grid-cols-2 xl:grid-cols-3">
        {filteredFilms.map((film) => (
          <Card key={film._id} film={film} />
        ))}
      </div>
    </div>
  );
};

export default Films;
