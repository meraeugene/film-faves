import React, { CSSProperties } from "react";
import { Film } from "../types/Film";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import RecommendCard from "./RecommendCard";
import { Tooltip } from "@chakra-ui/react";

interface SortedFilmsProps {
  title: string;
  sortedFilm: Film[];
  openGenreModal: (genre: string) => void;
}

const SortedFilms: React.FC<SortedFilmsProps> = ({
  title,
  sortedFilm,
  openGenreModal,
}) => {
  if (!Array.isArray(sortedFilm)) {
    // Handle the case where sortedFilm is not an array
    return <p>No films available</p>;
  }

  const handleClick = () => {
    window.scrollTo({ top: 0 });
  };

  // Autoplay settings for the latest films
  const autoplaySettings = {
    delay: 2500,
    disableOnInteraction: true,
  };

  const capitalizeWords = (str: string) => {
    return str
      .split(/\s|-/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="films__container relative mb-6 xl:mb-14 ">
      <div
        className="mb-6 inline-block cursor-pointer items-center xl:text-4xl"
        onClick={() => openGenreModal(title)}
      >
        <Tooltip label={`Browse All ${capitalizeWords(title)} Films`}>
          <h1 className="inline-block align-middle font-aquire  text-xl font-bold capitalize tracking-widest md:text-3xl xl:text-4xl ">
            {title}
          </h1>
        </Tooltip>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="ml-1 inline-block h-4 w-4 align-middle xl:h-8 xl:w-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>

      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as CSSProperties
        }
        className="mySwiper "
        centeredSlides={false}
        pagination={{
          clickable: true,
        }}
        autoplay={
          // Apply autoplay settings only for latest films
          title === "new releases" ? autoplaySettings : false
        }
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
          2560: {
            slidesPerView: 8,
            slidesPerGroup: 1,
            spaceBetween: 20,
          },
        }}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {sortedFilm.map((film) => {
          return (
            <SwiperSlide key={film._id}>
              <Link to={`/films/${film._id}`} onClick={handleClick}>
                {/* <AdvancedImage
                    cldImg={myImage}
                    plugins={[placeholder({ mode: "blur" }), lazyload()]}
                    className="image rounded-sm"
                  /> */}
                <img
                  src={film.image}
                  alt={film.title}
                  loading="lazy"
                  className="image rounded-sm"
                />
              </Link>
            </SwiperSlide>
          );
        })}
        {sortedFilm.length < 6 &&
          [...Array(6 - sortedFilm.length)].map((_, index) => (
            <SwiperSlide key={index}>
              <RecommendCard />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default SortedFilms;
