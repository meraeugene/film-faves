import axios from "axios";
import { useFilmsContext } from "../hooks/useFilmsContext";
import { useEffect, useState, useMemo } from "react";
import Card from "../components/Card";
import CardSkeleton from "../components/CardSkeleton";
import { Button } from "@chakra-ui/react";

const Films = () => {
  const {
    state: { films },
    dispatch,
  } = useFilmsContext();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchFilms = async () => {
    const result = await axios.get(`${import.meta.env.VITE_API_URL}`, {
      params: {
        page: currentPage,
        limit: itemsPerPage,
      },
    });
    const data = result.data.data;
    setIsLoading(false);
    dispatch({ type: "SET_FILMS", payload: data });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchFilms();
  }, [currentPage]);

  const [genre, setGenre] = useState("");

  const handleSelectGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(e.target.value);
    setCurrentPage(1); // Reset to the first page when changing genre
  };

  const filteredFilms = useMemo(() => {
    if (genre === "") {
      return films;
    } else {
      return films.filter((film) => film.category === genre);
    }
  }, [genre, films]);

  const totalPages = Math.ceil(filteredFilms.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage || newPage < 1 || newPage > totalPages) {
      return; // Prevent action if button is disabled or out of bounds
    }
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleFilms = filteredFilms.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

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
          <CardSkeleton cards={itemsPerPage} />
        ) : (
          visibleFilms.map((film) => <Card key={film._id} film={film} />)
        )}
      </div>

      {!isLoading && (
        <div className="pagination flex items-center justify-center gap-4 pt-16">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`pagination-item ${currentPage === 1 ? "disabled" : ""}`}
            variant="outline"
            colorScheme="dark"
            disabled={currentPage === 1}
            cursor={currentPage === 1 ? "not-allowed" : "pointer"}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              variant={currentPage === index + 1 ? "solid" : "outline"}
              bgColor={currentPage === index + 1 ? "white" : "transparent"}
              color={currentPage === index + 1 ? "black" : "white"}
              _hover={{ backgroundColor: "gray.700", color: "white" }}
              disabled={currentPage === index + 1}
              cursor={currentPage === index + 1 ? "not-allowed" : "pointer"}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`pagination-item  ${
              currentPage === totalPages ? "disabled" : ""
            }`}
            variant="outline"
            colorScheme="dark"
            disabled={currentPage === totalPages}
            cursor={currentPage === totalPages ? "not-allowed" : "pointer"}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default Films;
