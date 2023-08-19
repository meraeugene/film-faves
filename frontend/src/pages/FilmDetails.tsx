import { CSSProperties, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import LikeButton from "../components/LikeButton";
import { Button } from "@chakra-ui/react";
import { Film } from "../types/Film";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import FilmDetailsSkeleton from "../components/skeletons/FilmDetailsSkeleton";
import SameGenreSkeleton from "../components/skeletons/SameGenreSkeleton";

const FilmDetails = () => {
  const { id } = useParams();
  const [singleFilm, setSingleFilm] = useState<Film | null>(null);
  const [films, setFilms] = useState<Film[] | null>(null);
  const [singleFilmLoading, setSingleFilmLoading] = useState(true);
  const [sameGenreFilmsLoading, setSameGenreFilmsLoading] = useState(true);

  useEffect(() => {
    const getSingleFilm = async () => {
      try {
        // const response = await fetch(`http://localhost:4000/api/films/${id}`);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/films/${id}`,
        );
        const data = await response.json();
        setSingleFilm(data);
        setSingleFilmLoading(false);
      } catch (error) {
        console.log("Error fetching single film:", error);
        setSingleFilmLoading(false);
      }
    };

    const getSameGenreFilm = async () => {
      try {
        // const response = await fetch("http://localhost:4000/api/films");
        const response = await fetch(`${import.meta.env.VITE_API_URL}/films`);
        const data = await response.json();
        setFilms(data.data);
        setSameGenreFilmsLoading(false);
      } catch (error) {
        console.error("Error fetching same genre films:", error);
        setSameGenreFilmsLoading(false);
      }
    };

    getSingleFilm();
    getSameGenreFilm();
  }, [id]);

  const handleImageClick = () => {
    window.scrollTo({ top: 0 });
  };

  const sameGenreFilms = films
    ? films.filter(
        (film) =>
          film.genre === singleFilm?.genre && film._id !== singleFilm?._id,
      )
    : [];

  return (
    <div>
      <div className="film-details flex h-full flex-col justify-center bg-dark px-4 pt-16 text-white md:px-8">
        <Link to="/films" className=" w-0 ">
          <Button className="mb-8  font-aquire tracking-widest">
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.23047 11.8079L13.6879 8.09346C14.2089 7.65924 15 8.02976 15 8.70803V15.292C15 15.9702 14.2089 16.3408 13.6879 15.9065L9.23047 12.1921C9.11053 12.0921 9.11053 11.9079 9.23047 11.8079Z"
                fill="#222222"
              />
            </svg>
            Back
          </Button>
        </Link>
        {singleFilmLoading ? (
          <FilmDetailsSkeleton />
        ) : singleFilm !== null ? (
          <div className="flex w-full flex-col gap-6 md:flex-row">
            <div>
              <img
                src={singleFilm.image}
                alt={singleFilm.title}
                className="film-image w-full rounded-sm object-cover"
                loading="lazy"
              />
            </div>
            <div className="film-info font-outfit">
              <div className="mb-2">
                <LikeButton initialLikes={singleFilm.likes} filmId={id} />
              </div>
              <span className="font-outfit xl:text-xl">
                {singleFilm.release_date}
              </span>
              <h1 className="my-2 font-aquire text-xl font-bold tracking-widest xl:text-3xl">
                {singleFilm.title}
              </h1>
              <p className="mb-4 mt-4 text-sm tracking-wider lg:text-lg">
                {singleFilm.description}
              </p>
              <h2 className="my-2 text-sm capitalize lg:text-lg">
                <span className="text-gray-400">Genres: </span>
                {singleFilm.genre}
              </h2>
              <h2 className="lg:text-lg">
                <span className="text-sm text-gray-400 lg:text-lg">
                  Recommended by:
                </span>{" "}
                {singleFilm.recommendedBy}
              </h2>
              <Link to={singleFilm.link}>
                <Button className="mt-6 flex gap-2 font-aquire tracking-widest">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Watch Now
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <h1>Single Film not found</h1>
        )}

        <div className=" pb-8 pt-0">
          <div className="pt-14 md:pt-16">
            <h1 className="pb-6 font-aquire text-2xl tracking-wider text-white xl:text-3xl">
              You might like
            </h1>

            {sameGenreFilmsLoading ? (
              <SameGenreSkeleton />
            ) : films !== null && films.length > 0 ? (
              <Swiper
                style={
                  {
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                  } as CSSProperties
                }
                centeredSlides={false}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: true,
                }}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 3,
                    slidesPerGroup: 1,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 4,
                    slidesPerGroup: 1,
                    spaceBetween: 20,
                  },
                  1440: {
                    slidesPerView: 6,
                    slidesPerGroup: 1,
                    spaceBetween: 20,
                  },
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
              >
                {sameGenreFilms.map((film) => (
                  <SwiperSlide key={film._id}>
                    <Link
                      to={`/films/${film._id}`}
                      key={film._id}
                      onClick={handleImageClick}
                    >
                      <img
                        src={film.image}
                        alt={film.title}
                        className="image  rounded-sm"
                        loading="lazy"
                      />
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <h1>No Same Genre Films found</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmDetails;
