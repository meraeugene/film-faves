import React, { CSSProperties } from "react";
import { Film } from "../types/Film";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

// Import plugins
import { AdvancedImage, lazyload, placeholder } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

interface SortedFilmsProps {
  title: string;
  sortedFilm: Film[];
}

const SortedFilms: React.FC<SortedFilmsProps> = ({ title, sortedFilm }) => {
  if (!Array.isArray(sortedFilm)) {
    // Handle the case where sortedFilm is not an array
    return <p>No films available</p>;
  }

  const handleClick = () => {
    window.scrollTo({ top: 0 });
  };

  // Create and configure your Cloudinary instance.
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dupynxkci",
    },
  });

  return (
    <div className="films__container mb-6 xl:mb-14 ">
      <h1 className="mb-4 font-aquire text-xl font-bold capitalize tracking-widest xl:mb-8 xl:text-4xl">
        {title}
      </h1>
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
          2560: {
            slidesPerView: 8,
            slidesPerGroup: 1,
            spaceBetween: 20,
          },
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {sortedFilm.map((film) => {
          if (film.image) {
            const imgUrl = film.image.replace(
              "https://res.cloudinary.com/dupynxkci/image/upload/",
              "",
            );
            const myImage = cld.image(imgUrl);

            return (
              <SwiperSlide key={film._id}>
                <Link to={`/films/${film._id}`} onClick={handleClick}>
                  {/* <img
                    src={film.image}
                    alt={film.title}
                    className="image rounded-sm"
                    loading="lazy"
                  /> */}
                  <AdvancedImage
                    cldImg={myImage}
                    plugins={[placeholder({ mode: "blur" }), lazyload()]}
                  />
                </Link>
              </SwiperSlide>
            );
          }
        })}
      </Swiper>
    </div>
  );
};

export default SortedFilms;
