import { useState } from "react";
import axios from "axios";

interface LikeButtonProps {
  initialLikes: number;
  filmId: string | undefined;
}

const LikeButton = ({ initialLikes, filmId }: LikeButtonProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    try {
      if (isLiked) {
        setLikes((prevLikes) => prevLikes - 1);
        setIsLiked(false); // Update state immediately
        await axios.put(
          `${import.meta.env.VITE_API_URL}/films/${filmId}/unlike`,
        );
      } else {
        setLikes((prevLikes) => prevLikes + 1);
        setIsLiked(true); // Update state immediately
        await axios.put(`${import.meta.env.VITE_API_URL}/films/${filmId}/like`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      className="flex items-center gap-[.3em] text-sm tracking-widest md:text-sm lg:text-base"
      onClick={handleLike}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={isLiked ? "#FF0000" : "none"}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={isLiked ? "#FF0000" : "currentColor"}
        className="h-4 w-4 lg:h-5 lg:w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      {likes}
    </button>
  );
};

export default LikeButton;
