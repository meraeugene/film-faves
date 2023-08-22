import React, { CSSProperties } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Film } from "../types/Film";

const TopFavoritesSwiper: React.FC<{ topFavorites: Film[] }> = ({
  topFavorites,
}) => {
  const handleClick = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <h1 className="mb-6 font-aquire text-xl font-bold capitalize tracking-widest md:text-3xl xl:text-4xl">
        Top 10 Films
      </h1>

      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as CSSProperties
        }
        className="mb-12 h-full  cursor-pointer lg:mb-12"
        centeredSlides={false}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        navigation={true}
        breakpoints={{
          320: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            slidesPerGroup: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            slidesPerGroup: 2,
            spaceBetween: 20,
          },
          1366: {
            slidesPerView: 5,
            slidesPerGroup: 2,
            spaceBetween: 20,
          },
          1440: {
            slidesPerView: 6,
            slidesPerGroup: 2,
            spaceBetween: 20,
          },
          2560: {
            slidesPerView: 8,
            slidesPerGroup: 12,
            spaceBetween: 20,
          },
        }}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {topFavorites.map((film, index) => (
          <React.Fragment key={`film-${film._id}-${index}`}>
            <SwiperSlide key={`number-${film._id}-${index}`}>
              <span className="top-films-number font-extrabold">
                {index + 1}
              </span>
            </SwiperSlide>
            <SwiperSlide
              key={`film-details-${film._id}-${index}`}
              className="h-full"
            >
              <Link
                to={`/films/${film._id}/${film.title}`}
                onClick={handleClick}
              >
                <img
                  src={film.image}
                  alt={film.title}
                  className="image overlay rounded-sm"
                  loading="lazy"
                />
              </Link>
            </SwiperSlide>
          </React.Fragment>
        ))}
      </Swiper>
    </>
  );
};

export default TopFavoritesSwiper;
