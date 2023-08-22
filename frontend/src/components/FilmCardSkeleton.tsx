import Skeleton from "react-loading-skeleton";
import React from "react";

interface CardNumberProps {
  cardNumber: number;
}

const FilmCardSkeleton = ({ cardNumber }: CardNumberProps) => {
  return Array(cardNumber)
    .fill(0)
    .map((_, i) => (
      <React.Fragment key={i}>
        <div className="skeleton-card-mobile mb-8">
          <Skeleton height={25} className="mb-4 " width="60%" />
          <div className="card-skeleton-mobile ">
            <div className="left-col">
              <Skeleton className="card-img-skeleton" />
            </div>
            <div className="right-col">
              <Skeleton className="card-img-skeleton" />
            </div>
          </div>
        </div>

        <div className="skeleton-card-tablet mb-8">
          <Skeleton height={35} className="mb-4 " width="35%" />
          <div className="card-skeleton-tablet ">
            <div className="card-img">
              <Skeleton height={250} />
            </div>
            <div className="card-img">
              <Skeleton height={250} />
            </div>
            <div className="card-img">
              <Skeleton height={250} />
            </div>
            <div className="card-img">
              <Skeleton height={250} />
            </div>
          </div>
        </div>

        <div className="skeleton-card-desktop mb-8">
          <Skeleton height={35} className="mb-4 " width="30%" />
          <div className="card-skeleton-desktop ">
            <div className="card-img">
              <Skeleton height={360} />
            </div>
            <div className="card-img">
              <Skeleton height={360} />
            </div>
            <div className="card-img">
              <Skeleton height={360} />
            </div>
            <div className="card-img">
              <Skeleton height={360} />
            </div>
            <div className="card-img">
              <Skeleton height={360} />
            </div>
          </div>
        </div>

        <div className="skeleton-card-large-screen mb-8">
          <Skeleton height={35} className="mb-4 " width="30%" />
          <div className="card-skeleton-large-screen ">
            <div className="card-img">
              <Skeleton height={330} />
            </div>
            <div className="card-img">
              <Skeleton height={330} />
            </div>
            <div className="card-img">
              <Skeleton height={330} />
            </div>
            <div className="card-img">
              <Skeleton height={330} />
            </div>
            <div className="card-img">
              <Skeleton height={330} />
            </div>
            <div className="card-img">
              <Skeleton height={330} />
            </div>
          </div>
        </div>
      </React.Fragment>
    ));
};

export default FilmCardSkeleton;
