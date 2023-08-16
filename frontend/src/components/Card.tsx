import { Film } from "../types/Film";
import LikeButton from "./LikeButton";
import { Button } from "@chakra-ui/react";
import { AdvancedImage, placeholder, lazyload } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

interface CardProps {
  film: Film;
}

const Card = ({ film }: CardProps) => {
  // Extract image ID from the URL
  const [imageId] = film.image.match(/v(\d+)\/(.+)/);

  // Create a new Cloudinary instance
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dupynxkci", // Replace with your actual cloud name
    },
  });

  // Construct Cloudinary URL using Transformation
  const imageUrl = cld.image(imageId).quality("auto");

  return (
    <div className="card ">
      <div className="  flex gap-4 text-xs md:text-sm xl:text-lg ">
        <div className="card-image  w-1/2 md:w-full">
          <AdvancedImage
            cldImg={imageUrl}
            className="image rounded-md "
            plugins={[lazyload(), placeholder({ mode: "blur" })]}
          />
        </div>
        <div className="card-info flex  w-1/2   flex-col items-start gap-1 font-outfit lg:w-full">
          <LikeButton initialLikes={film.likes} filmId={film._id} />
          <h3 className=" text-sm capitalize md:text-sm lg:text-base">
            {film.title}
          </h3>
          <span>{film.release_date}</span>
          <h3 className="    text-gray-400">Recommended by :</h3>
          <span>{film.recommendedBy || "User"} </span>
          <h3 className="mt-2 ">
            <span className="  capitalize text-gray-400 ">Genre: </span>
            <span className=" capitalize">{film.genre}</span>
          </h3>

          <Button className=" mb-2 mt-3 w-full  rounded-sm    ">
            <a
              href={film.link}
              target="_blank"
              rel="noopener noreferer"
              className="flex  items-center gap-1   "
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
        </div>
      </div>
      <p className="mt-4 w-full  text-left font-outfit text-xs tracking-normal md:text-sm  xl:text-base">
        {film.description}
      </p>
    </div>
  );
};

export default Card;
