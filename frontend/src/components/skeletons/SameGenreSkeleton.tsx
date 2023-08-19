import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SameGenreSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-2">
      <Skeleton className="skeleton-img" />
      <Skeleton className="skeleton-img" />
    </div>
  );
};

export default SameGenreSkeleton;
