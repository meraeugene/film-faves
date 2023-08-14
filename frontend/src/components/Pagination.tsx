import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface PaginationProps {
  page: number;
  pages: number;
  changePage: (pageNumber: number) => void;
}

const Pagination = ({ page, pages, changePage }: PaginationProps) => {
  const navigate = useNavigate();

  const handlePageChange = (pageNumber: number) => {
    navigate(`/films?page=${pageNumber}`); // Update the URL format here
    changePage(pageNumber);
  };

  let middlePagination;

  if (pages <= 5) {
    middlePagination = [...Array(pages)].map((_, index) => (
      <Button
        key={index + 1}
        onClick={() => handlePageChange(index + 1)}
        _hover={{ bg: page === index + 1 ? "" : "gray" }}
        variant={page === index + 1 ? "solid" : "outline"}
        color={page === index + 1 ? "black" : "white"}
      >
        {index + 1}
      </Button>
    ));
  } else {
    const startValue = Math.floor((page - 1) / 5) * 5;

    middlePagination = (
      <>
        {[...Array(5)].map((_, index) => (
          <Button
            key={startValue + index + 1}
            isDisabled={page === startValue + index + 1}
            onClick={() => handlePageChange(startValue + index + 1)}
          >
            {startValue + index + 1}
          </Button>
        ))}

        <Button>...</Button>
        <Button onClick={() => handlePageChange(pages)}>{pages}</Button>
      </>
    );

    if (page > 5) {
      if (pages - page >= 5) {
        middlePagination = (
          <>
            <Button onClick={() => handlePageChange(1)}>1</Button>
            <Button>....</Button>
            <Button onClick={() => handlePageChange(startValue)}>
              {startValue}
            </Button>
            {[...Array(5)].map((_, index) => (
              <Button
                key={startValue + index + 1}
                isDisabled={page === startValue + index + 1}
                onClick={() => handlePageChange(startValue + index + 1)}
              >
                {startValue + index + 1}
              </Button>
            ))}

            <Button>...</Button>
            <Button onClick={() => handlePageChange(pages)}>{pages}</Button>
          </>
        );
      } else {
        let amountLeft = pages - page + 5;
        middlePagination = (
          <>
            <Button onClick={() => handlePageChange(1)}>1</Button>
            <Button>....</Button>
            <Button onClick={() => handlePageChange(startValue)}>
              {startValue}
            </Button>
            {[...Array(amountLeft)].map((_, index) => (
              <Button
                key={startValue + index + 1}
                style={
                  pages < startValue + index + 1 ? { display: "none" } : {}
                }
                isDisabled={page === startValue + index + 1}
                onClick={() => handlePageChange(startValue + index + 1)}
              >
                {startValue + index + 1}
              </Button>
            ))}
          </>
        );
      }
    }
  }

  return (
    pages > 1 && (
<<<<<<< HEAD
      <div className="flex flex-wrap items-center justify-center gap-2 pt-10">
=======
      <div className="flex flex-wrap items-center justify-center gap-2 pt-8 w-full">
>>>>>>> 3d0af5b61443cfbeda32568bba7e0cd9b71ba6fb
        <Button
          onClick={() => handlePageChange(page - 1)}
          isDisabled={page === 1}
          variant="outline"
          color="white"
          _hover={{ bg: page === 1 ? "" : "gray" }}
<<<<<<< HEAD
          className="font-aquire"
=======
className="font-aquire"
>>>>>>> 3d0af5b61443cfbeda32568bba7e0cd9b71ba6fb
        >
          Prev
        </Button>

        {middlePagination}

        <Button
          onClick={() => handlePageChange(page + 1)}
          isDisabled={page === pages}
          variant="outline"
          color="white"
          _hover={{ bg: page === pages ? "" : "gray" }}
<<<<<<< HEAD
          className="font-aquire"
        >
          Next
=======
className="font-aquire"
        >
        Next
>>>>>>> 3d0af5b61443cfbeda32568bba7e0cd9b71ba6fb
        </Button>
      </div>
    )
  );
};

export default Pagination;
