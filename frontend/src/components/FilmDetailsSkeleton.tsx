import Skeleton from "react-loading-skeleton";

const FilmDetailsSkeleton = () => {
  return (
    <div className="h-full bg-dark px-4 pb-8 pt-8 md:px-8">
      <div className="film-details-skeleton__mobile">
        <Skeleton width={105} height={40} />

        <div className="mt-8 flex flex-wrap items-start gap-4">
          <div className="flex-1">
            <Skeleton className="film-details-skeleton-img" />
          </div>

          <div className="flex-1">
            <Skeleton width={50} className="my-2" />
            <Skeleton width={50} className="mb-2" />
            <Skeleton height={25} className="my-4" />
            <Skeleton width="60%" />
            <Skeleton width="60%" />
            <Skeleton width={150} height={40} className="mt-4" />
          </div>
        </div>

        <div className="mt-4">
          <Skeleton count={3} className="mt-2" />
        </div>

        <div className="mt-12 flex w-full gap-3">
          <div className=" flex-1 ">
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
          <div className=" flex-1">
            <Skeleton className="film-details-skeleton-img-tablet" />
          </div>
          <div className=" hide-skeleton flex-1">
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
