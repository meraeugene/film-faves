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
import FilmDetailsSkeleton from "../components/FilmDetailsSkeleton";

const FilmDetails = () => {
  const { id } = useParams();
  const [singleFilm, setSingleFilm] = useState<Film | null>(null);
  const [films, setFilms] = useState<Film[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // const response = await fetch(`http://localhost:4000/api/films/${id}`);
      // const response = await fetch("http://localhost:4000/api/films");

      try {
        const [singleFilmResponse, filmsResponse] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/films/${id}`),
          fetch(`${import.meta.env.VITE_API_URL}/films`),
        ]);

        const singleFilmData = await singleFilmResponse.json();
        const filmsData = await filmsResponse.json();

        setSingleFilm(singleFilmData);
        setFilms(filmsData.data);
        setIsLoading(false); // Data has been fetched, set loading to false
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Handle error, but still set loading to false
      }
    };

    fetchData();
  }, [id]);

  const sameGenreFilms = films
    ? films.filter(
        (film) =>
          film.genre === singleFilm?.genre && film._id !== singleFilm?._id,
      )
    : [];

  return (
    <div>
      {isLoading ? (
        <FilmDetailsSkeleton />
      ) : (
        <div className="film-details flex h-full flex-col justify-center bg-dark px-4 py-6 text-white md:px-10 md:py-8">
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

          {singleFilm !== null && (
            <div className="flex w-full  flex-wrap gap-4 md:flex-row">
              <img
                src={singleFilm.image}
                alt={singleFilm.title}
                loading="lazy"
                className="film-image   rounded-sm object-cover"
              />

              <div className="film-info  font-outfit">
                <div className="mb-2">
                  <LikeButton initialLikes={singleFilm.likes} filmId={id} />
                </div>
                <span className="font-outfit xl:text-xl">
                  {singleFilm.release_date}
                </span>
                <h1 className=" my-2 font-aquire text-base font-bold tracking-widest xl:text-3xl ">
                  {singleFilm.title}
                </h1>

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
                  <Button
                    className="mt-4 font-aquire tracking-widest"
                    width={150}
                  >
                    <a
                      href={singleFilm.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center  gap-2"
                    >
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
                    </a>
                  </Button>
                </Link>

                <p className="film-desc_mobile mt-4 text-sm tracking-wider  lg:text-lg">
                  {singleFilm.description}
                </p>
              </div>
              <p className="film-desc_desktop mt-2 text-sm tracking-wider  ">
                {singleFilm.description}
              </p>
            </div>
          )}

          <div className=" pb-8 pt-0">
            <div className="pt-14 md:pt-16">
              <h1 className="pb-6 font-aquire text-2xl tracking-wider text-white xl:text-3xl">
                You might like
              </h1>

              {films !== null && films.length > 0 && (
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
                    425: {
                      slidesPerView: 3,
                      slidesPerGroup: 1,
                      spaceBetween: 10,
                    },
                    768: {
                      slidesPerView: 4,
                      slidesPerGroup: 1,
                      spaceBetween: 20,
                    },
                    1024: {
                      slidesPerView: 5,
                      slidesPerGroup: 1,
                      spaceBetween: 20,
                    },
                    1366: {
                      slidesPerView: 5,
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
                  {sameGenreFilms.map((film) => {
                    return (
                      <SwiperSlide key={film._id}>
                        <Link
                          to={`/films/${film._id}/${film.title}`}
                          key={film._id}
                        >
                          <img
                            src={film.image}
                            alt={film.title}
                            className="image  h-full w-full rounded-sm object-cover"
                            loading="lazy"
                            onClick={() => {
                              window.scrollTo(0, 0);
                            }}
                          />
                        </Link>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilmDetails;
