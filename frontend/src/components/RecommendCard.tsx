import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useToast } from "@chakra-ui/react";

const RecommendCard = () => {
  const { user } = useAuthContext();
  const toast = useToast();

  return user ? (
    <Link to="/recommend">
      <div className="recommend-card flex flex-col items-center justify-center rounded-sm text-center font-aquire text-3xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6 cursor-pointer"
        >
          <path
            fillRule="evenodd"
            d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </Link>
  ) : (
    <div
      className="recommend-card flex flex-col items-center justify-center rounded-sm text-center font-aquire text-3xl "
      onClick={() =>
        toast({
          title: "Authentication Required",
          description: "Please login to recommend a film.",
          status: "error",
          duration: 2500,
          isClosable: true,
          position: "top",
        })
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6 cursor-pointer"
      >
        <path
          fillRule="evenodd"
          d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default RecommendCard;
