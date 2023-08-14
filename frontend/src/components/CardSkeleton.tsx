import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface CardSkeletonProps {
  filmsPerPage: number;
}

const CardSkeleton = ({ filmsPerPage }: CardSkeletonProps) => {
  return Array(filmsPerPage)
    .fill(0)
    .map((_, index) => (
      <div className="flex flex-col" key={index}>
        <div className="card-skeleton">
          <div className="left-col">
            <Skeleton className="skeleton__img" />
          </div>

          <div className="right-col">
            <Skeleton className="skeleton-heart__btn" />
            <Skeleton className="lg:my-3" />
            <Skeleton className="skeleton-year " />
            <Skeleton className="skeleton-recommended lg:my-3" />
            <Skeleton />
            <Skeleton className="my-2 lg:my-4" />
            <Skeleton className="skeleton__btn" />
          </div>
        </div>
        <div className="bottom-col mt-4">
          <Skeleton count={3} />
        </div>
      </div>
    ));
};

export default CardSkeleton;
