import axios from "axios";
import { useFilmsContext } from "../hooks/useFilmsContext";
import { useEffect, useMemo, useState } from "react";
import Card from "../components/Card";
import CardSkeleton from "../components/CardSkeleton";
import Pagination from "../components/Pagination";

interface FilmsProps {
  pageNumber: number;
}

const Films = ({ pageNumber }: FilmsProps) => {
  const parsedPageNumber = Number(pageNumber);

  const {
    state: { films },
    dispatch,
  } = useFilmsContext();

  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(parsedPageNumber);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchFilms = async () => {
      setIsLoading(true);
      try {
        // const result = await axios.get(
        //   `http://localhost:4000/api/films?page=${page}`,
        // );
        const result = await axios.get(
          `https://filmsfavesapi.onrender.com/api/films?page=${page}`,
        );

        const { data, pages: totalPages } = result.data;
        setPages(totalPages);

        dispatch({ type: "SET_FILMS", payload: data });

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching films:", error);
        setIsLoading(false);
      }
    };

    fetchFilms();
  }, [page]);

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

  console.log(page);

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
        {isLoading ? (
          <CardSkeleton cards={6} />
        ) : (
          filteredFilms.map((film) => <Card key={film._id} film={film} />)
        )}
      </div>
      <Pagination page={page} pages={pages} changePage={setPage} />
    </div>
  );
};

export default Films;
