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
      <div className="flex flex-wrap items-center justify-center gap-4 pt-12">
        <Button
          onClick={() => handlePageChange(page - 1)}
          isDisabled={page === 1}
          variant="outline"
          color="white"
          _hover={{ bg: page === 1 ? "" : "gray" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
            />
          </svg>
        </Button>

        {middlePagination}

        <Button
          onClick={() => handlePageChange(page + 1)}
          isDisabled={page === pages}
          variant="outline"
          color="white"
          _hover={{ bg: page === pages ? "" : "gray" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
            />
          </svg>
        </Button>
      </div>
    )
  );
};

export default Pagination;
