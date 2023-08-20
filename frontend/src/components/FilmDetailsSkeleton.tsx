import Skeleton from "react-loading-skeleton";

const FilmDetailsSkeleton = () => {
  return (
    <div className="h-full bg-dark px-4 pb-8 pt-16 md:px-8">
      <div className="film-details-skeleton__mobile">
        <Skeleton width={105} height={40} />
        <Skeleton height={425} className="mt-8" />
        <Skeleton width={50} className="mt-4" />
        <Skeleton width={50} className="mt-3" />
        <Skeleton height={25} className="my-4" />
        <Skeleton count={3} />
        <Skeleton width="60%" className="my-3" />
        <Skeleton width="60%" className="mb-4" />
        <Skeleton width={175} height={40} />
        <Skeleton width="60%" height={30} className="mt-14" />

        <div className="mt-4 flex gap-3">
          <div className=" flex-1">
            <Skeleton className="film-details-skeleton-img" />
          </div>
          <div className=" flex-1">
            <Skeleton className="film-details-skeleton-img" />
          </div>
        </div>
      </div>

      <div className="film-details-skeleton__tablet">
        <Skeleton width={105} height={40} />

        <div className="mt-8 flex gap-6">
          <div className="">
            <Skeleton height={400} width={270} />
          </div>
          <div className="flex-1">
            <Skeleton width={50} />
            <Skeleton width={50} className="my-4 " />
            <Skeleton width="70%" height={25} className="mb-6 mt-2" />
            <Skeleton width="70%" count={3} />
            <Skeleton width="60%" className="mt-6" />
            <Skeleton width="60%" className="mt-4" />
            <Skeleton width={175} height={40} className="mt-6" />
          </div>
        </div>

        <div className="mt-16 flex gap-3">
          <div className=" flex-1">
            <Skeleton className="film-details-skeleton-img-tablet" />
          </div>
          <div className=" flex-1">
            <Skeleton className="film-details-skeleton-img-tablet" />
          </div>
          <div className=" flex-1">
            <Skeleton className="film-details-skeleton-img-tablet" />
          </div>
          <div className=" hide-skeleton flex-1">
            <Skeleton className="film-details-skeleton-img-tablet" />
          </div>
          <div className=" hide-skeleton-tablet flex-1">
            <Skeleton className="film-details-skeleton-img-tablet" />
          </div>
          <div className=" hide-skeleton-tablet flex-1">
            <Skeleton className="film-details-skeleton-img-tablet" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmDetailsSkeleton;
