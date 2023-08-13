import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface CardSkeletonProps {
  cards: number;
}

const CardSkeleton = ({ cards }: CardSkeletonProps) => {
  return Array(cards)
    .fill(0)
    .map((_, index) => (
      <div className="flex flex-col" key={index}>
        <div className="card-skeleton">
          <div className="left-col">
            <Skeleton width={210} height={310} />
          </div>

          <div className="right-col">
            <Skeleton width={50} />
            <Skeleton className="my-4" />
            <Skeleton width={100} />
            <Skeleton width={150} className="my-4" />
            <Skeleton />
            <Skeleton className="mt-5" />
            <Skeleton className="mt-4" height={40} />
          </div>
        </div>
        <div className="bottom-col">
          <Skeleton className="mt-4" count={3} />
        </div>
      </div>
    ));
};

export default CardSkeleton;
