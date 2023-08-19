import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FilmDetailsSkeleton = () => {
  return (
    <div className="flex flex-col gap-12 md:flex-row">
      <div>
        <Skeleton className="film-details__image" />
      </div>
      <div>
        <Skeleton className="film-details__likebtn" />
        <Skeleton className="film-details__releaseDate" />
        <Skeleton className="film-details__title" />
        <Skeleton count={3} className="film-details__desc" />
        <Skeleton className="film-details__genre" />
        <Skeleton className="film-details__recommendedBy" />
        <Skeleton className="film-details__watchnowBtn" />
      </div>
    </div>
  );
};

export default FilmDetailsSkeleton;
