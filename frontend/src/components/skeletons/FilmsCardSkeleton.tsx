import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FilmsCardSkeleton = () => {
  return (
    <>
      <div className="film-card-skeleton__mobile-320">
        <Skeleton className="mt-4" width={170} height={25} />
        <div className="mb-6 mt-4 flex gap-4">
          <Skeleton width={135} height={210} />
          <Skeleton width={135} height={210} />
        </div>
        <Skeleton width={180} height={25} />
        <div className="mt-4 flex gap-4 ">
          <Skeleton width={135} height={210} />
          <Skeleton width={135} height={210} />
        </div>
      </div>

      <div className="film-card-skeleton__mobile-375 pb-8">
        <Skeleton className="mt-4" width={170} height={25} />
        <div className="mb-6 mt-4 flex gap-4">
          <Skeleton width={162} height={250} />
          <Skeleton width={162} height={250} />
        </div>
        <Skeleton width={190} height={25} />
        <div className="mt-4 flex gap-4 ">
          <Skeleton width={162} height={250} />
          <Skeleton width={162} height={250} />
        </div>
      </div>

      <div className="film-card-skeleton__mobile-425 pb-8">
        <Skeleton className="mt-4" width={200} height={25} />
        <div className="mb-6 mt-4 flex gap-4">
          <Skeleton width={187} height={288} />
          <Skeleton width={187} height={288} />
        </div>
        <Skeleton width={210} height={25} />
        <div className="mt-4 flex gap-4 ">
          <Skeleton width={187} height={288} />
          <Skeleton width={187} height={288} />
        </div>
      </div>

      <div className="film-card-skeleton__tablet pb-8">
        <Skeleton className="mt-4" width={240} height={25} />
        <div className="mb-6 mt-4 flex gap-6">
          <Skeleton width={218} height={330} />
          <Skeleton width={218} height={330} />
          <Skeleton width={218} height={330} />
        </div>
        <Skeleton className="mt-4" width={250} height={25} />
        <div className="mb-6 mt-4 flex gap-6">
          <Skeleton width={218} height={330} />
          <Skeleton width={218} height={330} />
          <Skeleton width={218} height={330} />
        </div>
      </div>

      <div className="film-card-skeleton__1024 pb-8">
        <Skeleton width={300} height={40} className="mt-8" />

        <div className="mt-8 flex items-center gap-6">
          <Skeleton width={220} height={320} />
          <Skeleton width={220} height={320} />
          <Skeleton width={220} height={320} />
          <Skeleton width={220} height={320} />
        </div>

        <Skeleton width={300} height={40} className="mt-12" />

        <div className="mt-8 flex items-center gap-6">
          <Skeleton width={220} height={320} />
          <Skeleton width={220} height={320} />
          <Skeleton width={220} height={320} />
          <Skeleton width={220} height={320} />
        </div>
      </div>

      <div className="film-card-skeleton__desktop">
        <Skeleton width={300} height={40} className="mt-8" />

        <div className="mt-8 flex items-center gap-4">
          <Skeleton width={230} height={320} />
          <Skeleton width={230} height={320} />
          <Skeleton width={230} height={320} />
          <Skeleton width={230} height={320} />
          <Skeleton width={230} height={320} />
          <Skeleton width={230} height={320} />
        </div>

        <Skeleton width={300} height={40} className="mt-12" />

        <div className="mt-8 flex items-center gap-4">
          <Skeleton width={230} height={320} />
          <Skeleton width={230} height={320} />
          <Skeleton width={230} height={320} />
          <Skeleton width={230} height={320} />
          <Skeleton width={230} height={320} />
          <Skeleton width={230} height={320} />
        </div>
      </div>
    </>
  );
};

export default FilmsCardSkeleton;
